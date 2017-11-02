import { Shops, Products, Tags, Shipping } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";

function checkForShops() {
  const numShops = Shops.find().count();
  return numShops;
}

function loadShops() {
  if (!checkForShops()) {
    const shops =   require("/imports/plugins/custom/reaction-swag-shop/private/data/Shops.json");
    shops.forEach((shop) => {
      Shops.insert(shop);
    });
    Logger.info("Shops loaded");
  }
}

function loadProducts() {
  const products = require("/imports/plugins/custom/reaction-swag-shop/private/data/Products.json");
  products.forEach((product) => {
    Products.direct.insert(product);
  });
  Logger.info("Products loaded");
}

function loadTags() {
  Logger.info("Starting load Tags");
  const tags = require("/imports/plugins/custom/reaction-swag-shop/private/data/Tags.json");
  tags.forEach((tag) => {
    Tags.insert(tag);
  });
  Logger.info("Tags loaded");
}

function loadShipping() {
  const shipping = require("/imports/plugins/custom/reaction-swag-shop/private/data/Shipping.json");
  shipping.forEach((shippingRecord) => {
    Shipping.insert(shippingRecord);
  });
  Logger.info("Shipping loaded");
}

function enableShipping() {
  // Enable flat rate shipping records
}

function enablePayment() {
  // Enable the example payment method
}

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("beforeCoreInit", () => {
  loadShops();
  loadProducts();
  loadTags();
  loadShipping();
  enableShipping();
  enablePayment();
});
