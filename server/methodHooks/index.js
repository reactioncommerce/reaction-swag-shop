import { Meteor } from "meteor/meteor";
import MethodHooks from "/imports/plugins/core/core/server/method-hooks";
import { Catalog, Products } from "/lib/collections";


/**
 * @summary When a product is published, create a "related tag" for it and add newly set product fields
 *  (relatedTag & relatedTagId) on associated Catalog document.
 */
MethodHooks.after("catalog/publish/products", (options) => {
  const { arguments } = options;

  const productIds = arguments[0];
  productIds.forEach((productId) => {
    Meteor.call("createRelatedTag", productId);

    const product = Products.findOne({ _id: productId });
    const { relatedTag, relatedTagId } = product;

    const selector = { "product.productId": productId };
    const modifier = { $set: { "product.relatedTag": relatedTag, "product.relatedTagId": relatedTagId } };
    Catalog.update(selector, modifier);
  });

  return options.result;
});
