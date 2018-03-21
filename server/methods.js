import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import bufferStreamReader from "buffer-stream-reader";
import { FileRecord } from "@reactioncommerce/file-collections";
import { Shops, Products, Tags, Shipping, MediaRecords, Packages, Catalog } from "/lib/collections";
import { Media } from "/imports/plugins/core/files/server";
import { Logger, Reaction } from "/server/api";

function checkForShops() {
  const numShops = Shops.find().count();
  return numShops;
}

function checkForProducts() {
  const numProducts = Products.find().count();
  return numProducts !== 0;
}

function checkForTags() {
  const numTags = Tags.find().count();
  return numTags !== 0;
}

function checkForShipping() {
  const numShipping = Shipping.find().count();
  return numShipping !== 0;
}

function checkForMedia() {
  const numMedia = MediaRecords.find().count();
  return numMedia !== 0;
}

function checkForCatalog() {
  const numCatalog = Catalog.find().count();
  return numCatalog !== 0;
}

async function storeFromAttachedBuffer(fileRecord) {
  const { stores } = fileRecord.collection.options;
  const bufferData = fileRecord.data;

  // We do these in series to avoid issues with multiple streams reading
  // from the temp store at the same time.
  try {
    for (const store of stores) {
      if (fileRecord.hasStored(store.name)) {
        return Promise.resolve();
      }

      store.createWriteStream(fileRecord)
        .then((writeStream) => {
          // Make a new read stream in each loop because you can only read once
          const readStream = new bufferStreamReader(bufferData);
          return new Promise((resolve, reject) => {
            fileRecord.once("error", reject);
            fileRecord.once("stored", resolve);
            readStream.pipe(writeStream);
          });
        }).catch((error) => {
          Logger.error("Error in createWriteStream:", error);
        });
    };
  } catch (error) {
    throw new Error("Error in storeFromAttachedBuffer:", error);
  }
}

const methods = {};

methods.loadShops = function () {
  Logger.info("Starting load Shops");
  if (!checkForShops()) {
    const shops = require("../private/data/Shops.json");
    shops.forEach((shop) => {
      Shops.insert(shop);
      Logger.info(`Inserted shop: ${shop.name}`);
    });
    Logger.info("Shops loaded");
  }
};

methods.loadProducts = function () {
  Logger.info("Starting load Products");
  if (!checkForProducts()) {
    const products = require("../private/data/Products.json");
    products.forEach((product) => {
      product.workflow.workflow = ["imported"]; // setting this bypasses revision control
      product.createdAt = new Date();
      product.updatedAt = new Date();
      Products.insert(product, {}, { publish: true });
    });
    Logger.info("Products loaded");
  } else {
    Logger.info("Products skipped. Already exists");
  }
};

methods.publishProducts = function () {
  if (!checkForCatalog()) {
    const userId = Meteor.users.findOne({ name: "Admin" })._id;
    const productIds = Products.find({ type: "simple" }).map((doc) => doc._id);
    Meteor.runAsUser(userId, () => {
      Meteor.call("catalog/publish/products", productIds);
    });
  }
};

methods.loadTags = function () {
  if (!checkForTags()) {
    Logger.info("Starting load Tags");
    const tags = require("../private/data/Tags.json");
    tags.forEach((tag) => {
      tag.updatedAt = new Date();
      Tags.insert(tag);
    });
    Logger.info("Tags loaded");
  }
};

methods.loadShipping = function () {
  if (!checkForShipping()) {
    Logger.info("Starting load Shipping");
    const shipping = require("../private/data/Shipping.json");
    shipping.forEach((shippingRecord) => {
      Shipping.insert(shippingRecord);
    });
    Logger.info("Shipping loaded");
  }
};

methods.enableShipping = function () {
  Packages.update({ name: "reaction-shipping-rates" }, {
    $set: {
      "settings.flatRates.enabled": true
    }
  });
  Logger.info("Flat Rates shipping enabled");
};

methods.initLayout = function () {
  // TODO: Everytime the packages are inserted into registry, the packages layout will
  // be cloned, regardless if the shop's layout is already there. This is the reason, we need
  // to set the layout again in this method.
  const layout = require("../private/data/Layout.json");
  const shopId = Reaction.getShopId();
  return Shops.update(shopId, {
    $set: { layout }
  });
};

methods.enablePayment = function () {
  Packages.update({ name: "example-paymentmethod" }, {
    $set: {
      "settings.example-paymentmethod.enabled": true
    }
  });
  Logger.info("Example payment method enabled");
};

function getTopVariant(productId) {
  const topVariant = Products.findOne({
    "ancestors": { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

methods.importProductImages = function () {
  Logger.info("Started loading product images");
  if (!checkForMedia()) {
    const products = Products.find({ type: "simple" }).fetch();
    for (const product of products) {
      const productId = product._id;
      if (!MediaRecords.findOne({ "metadata.productId": productId })) {
        const { shopId } = product;
        const filepath = `plugins/reaction-swag-shop/images/${productId}.jpg`;
        const uint8array = Assets.getBinary(filepath);
        const topVariant = getTopVariant(productId);

        const metadata = {
          productId,
          variantId: topVariant._id,
          toGrid: 1,
          shopId,
          priority: 0,
          workflow: "published"
        };
        const fileRecord = new FileRecord({
          original: {
            size: uint8array.length,
            name: `${productId}.jpg`,
            type: "image/jpeg"
          }
        });
        fileRecord.attachData(new Buffer(uint8array));
        fileRecord.metadata = metadata;
        Media.insert(fileRecord);
        Promise.await(storeFromAttachedBuffer(fileRecord));
      }
    }
    Logger.info("loaded product images");
  } else {
    Logger.info("Skipped loading product images");
  }
};

methods.setupRoutes = function () {
  Packages.update(
    {
      "name": "reaction-product-variant",
      "registry.name": "tag"
    },
    {
      $set:
        {
          "registry.$.template": "ProductsCustomer"
        }
    }
  );
};

methods.createTag = function (name) {
  check(name, String);
  const existingTag = Tags.findOne({ name });
  // keep the tag names unique
  if (!existingTag) {
    const tag = {
      name,
      slug: Reaction.getSlug(name),
      isTopLevel: false,
      updatedAt: new Date(),
      createdAt: new Date()
    };

    return Tags.insert(tag);
  }
};

Meteor.methods({ createTag: methods.createTag });

export default methods;
