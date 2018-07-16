import { CatalogProduct } from "/lib/collections/schemas";

CatalogProduct.extend({
  featuredProductLabel: {
    optional: true,
    type: String
  },
  relatedTag: {
    optional: true,
    type: String
  },
  relatedTagId: {
    optional: true,
    type: String
  }
});
