import { Meteor } from "meteor/meteor";
import { Products, Catalog } from "/lib/collections";

/**
 * @name copyProductFieldsToCatalog
 * @summary Copies swag shop custom fields from a product to it's associated Catalog document
 * @param {String} productId - _id of product to copy fields from
 * @returns {undefined}
 */
export default function copyProductFieldsToCatalog(productId) {
  const product = Products.findOne({ _id: productId });
  if (!product) {
    throw new Meteor.Error("not-found", "Product not found");
  }

  const fieldNames = [
    "featuredProductLabel",
    "relatedTag",
    "relatedTagId"
  ];

  const selector = { "product.productId": productId };
  const modifier = { $set: {} };
  fieldNames.forEach((customFieldName) => {
    modifier.$set[`product.${customFieldName}`] = product[customFieldName];
  });

  Catalog.update(selector, modifier);
}
