import bufferStreamReader from "buffer-stream-reader";
import { FileRecord } from "@reactioncommerce/file-collections";
import Logger from "@reactioncommerce/logger";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Catalog, MediaRecords, Packages, Products, Shipping, Shops, Tags } from "/lib/collections";
import collections from "/imports/collections/rawCollections";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import publishProductsToCatalog from "/imports/plugins/core/catalog/server/no-meteor/utils/publishProductsToCatalog";
import { Media } from "/imports/plugins/core/files/server";
import copyProductFieldsToCatalog from "./lib/copyProductFieldsToCatalog";

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

      // Make a new read stream in each loop because you can only read once
      const readStream = new bufferStreamReader(bufferData);
      const writeStream = await store.createWriteStream(fileRecord);
      await new Promise((resolve, reject) => {
        fileRecord.once("error", reject);
        fileRecord.once("stored", resolve);
        readStream.pipe(writeStream);
      });
    }
  } catch (error) {
    throw new Error("Error in storeFromAttachedBuffer:", error);
  }
}

const methods = {};

methods.loadShops = function () {
  Logger.info("Started loading swag shop");
  if (!checkForShops()) {
    const shops = require("../private/data/Shops.json");
    shops.forEach((shop) => {
      Shops.insert(shop);
      Logger.info(`Inserted shop: ${shop.name}`);
    });
    Logger.info("Swag shop loaded");
  } else {
    Logger.info("Shop already exists.");
  }
};

methods.loadProducts = function () {
  Logger.info("Started loading swag shop products");
  if (!checkForProducts()) {
    const products = require("../private/data/Products.json");
    products.forEach((product) => {
      product.workflow.workflow = ["imported"]; // setting this bypasses revision control
      product.createdAt = new Date();
      product.updatedAt = new Date();
      Products.insert(product, {}, { publish: true });
    });
    Logger.info("Swag shop products loaded");
  } else {
    Logger.info("Loading swag shop products skipped. Products already exist");
  }
};

methods.publishProducts = function () {
  if (!checkForCatalog()) {
    Logger.info("Publishing swag shop products.");
    const productIds = Products.find({ type: "simple" }).map((doc) => doc._id);
    Promise.await(publishProductsToCatalog(productIds, collections));

    // Manually set custom fields on Catalog documents
    productIds.forEach((productId) => {
      copyProductFieldsToCatalog(productId);
    });
  }
};

methods.loadTags = function () {
  if (!checkForTags()) {
    Logger.info("Started loading swag shop tags");
    const tags = require("../private/data/Tags.json");
    tags.forEach((tag) => {
      tag.updatedAt = new Date();
      Tags.insert(tag);
    });
    Logger.info("Swag shop tags loaded");
  }
};

methods.loadShipping = function () {
  if (!checkForShipping()) {
    Logger.info("Started loading swag shop shipping settings");
    const shipping = require("../private/data/Shipping.json");
    shipping.forEach((shippingRecord) => {
      Shipping.insert(shippingRecord);
    });
    Logger.info("Swag shop shipping settings loaded");
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
  Logger.info("Started loading swag shop product images");
  if (!checkForMedia()) {
    const products = Products.find({ type: "simple" }).fetch();
    for (const product of products) {
      const fileName = `${product._id}.jpg`;
      const filepath = `plugins/reaction-swag-shop/images/${fileName}`;
      const binary = Assets.getBinary(filepath);
      const buffer = new Buffer(binary);
      const fileRecord = new FileRecord({
        original: {
          name: fileName,
          size: buffer.length,
          type: "image/jpeg",
          updatedAt: new Date()
        }
      });
      fileRecord.attachData(buffer);
      const { shopId } = product;
      if (product.type === "simple") {
        const topVariant = getTopVariant(product._id);
        fileRecord.metadata = {
          productId: product._id,
          variantId: topVariant._id,
          toGrid: 1,
          shopId,
          priority: 0,
          workflow: "published"
        };
      }
      Promise.await(Media.insert(fileRecord));
      Promise.await(storeFromAttachedBuffer(fileRecord));
    }
    Logger.info("Loaded swag product images");
  } else {
    Logger.info("Skipped loading swag shop product images");
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

/**
 * @name createRelatedTag
 * @summary Inserts a new tag known as a product's "related tag" based on product's handle.
 *  Ex: Product handle = "reaction-mug". Tag is created w/ name "reaction-mug-related".
 *  Other products can be tagged with "reaction-mug-related" in order to appear on Mug's "Similar Products" block.
 * @param {String} productId - _id of product
 * @returns {undefined}
 */
methods.createRelatedTag = function (productId) {
  check(productId, String);

  const product = Products.findOne({ _id: productId }, { fields: { handle: 1 } });
  if (!product) {
    throw new Meteor.Error("not-found", "Product not found");
  }

  const relatedTagName = `${product.handle}-related`;
  const relatedTag = Tags.findOne({ name: relatedTagName });

  let relatedTagId = "";
  if (relatedTag) {
    relatedTagId = relatedTag._id;
  } else {
    relatedTagId = Tags.insert({
      name: relatedTagName,
      shopId: Reaction.getPrimaryShopId(),
      slug: Reaction.getSlug(relatedTagName),
      isTopLevel: false,
      updatedAt: new Date(),
      createdAt: new Date()
    });
  }

  // Add relatedTagId to product
  Products.update(
    { _id: productId },
    { $set: { relatedTag: relatedTagName, relatedTagId } },
    { selector: { type: "simple" }, publish: true }
  );
};

Meteor.methods({ createRelatedTag: methods.createRelatedTag });

export default methods;
