import { Shops, Products, Tags, Shipping, Media, Packages } from "/lib/collections";
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
  const numMedia = Media.find().count();
  return numMedia !== 0;
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
    $set: { layout: layout }
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
      if (!Media.findOne({ "metadata.productId": productId })) {
        const shopId = product.shopId;
        const filepath = `plugins/reaction-swag-shop/images/${productId}.jpg`;
        const binary = Assets.getBinary(filepath);
        const fileObj = new FS.File();
        const fileName = `${productId}.jpg`;
        fileObj.attachData(binary, { type: "image/jpeg", name: fileName });
        const topVariant = getTopVariant(productId);
        fileObj.metadata = {
          productId: productId,
          variantId: topVariant._id,
          toGrid: 1,
          shopId: shopId,
          priority: 0,
          workflow: "published"
        };
        Media.insert(fileObj);
      }
    }
    Logger.info("loaded product images");
  } else {
    Logger.info("Skipped loading product images");
  }
};

methods.createTag = function (name, type) {
  const existingTag = Tags.findOne({ name });
  // keep the tag names unique
  if (!existingTag) {
    const tag = {
      name,
      slug: Reaction.getSlug(name),
      isTopLevel: false,
      type,
      updatedAt: new Date(),
      createdAt: new Date()
    };

    return Tags.insert(tag);
  }
};

export default methods;
