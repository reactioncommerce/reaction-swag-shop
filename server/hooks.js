import { Meteor } from "meteor/meteor";
import MethodHooks from "/imports/plugins/core/core/server/method-hooks";
import copyProductFieldsToCatalog from "./lib/copyProductFieldsToCatalog";

/**
 * @summary When a product is published, manually set custom fields from Products to Catalog.

 */
MethodHooks.after("catalog/publish/products", (options) => {
  const productIds = options.arguments[0];
  productIds.forEach((productId) => {
    // Create a "related tag" for product if one doesn't already exist
    Meteor.call("createRelatedTag", productId);

    // Load custom fields from product and save to Catalog
    copyProductFieldsToCatalog(productId);
  });

  return options.result;
});
