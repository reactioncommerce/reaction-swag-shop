import { CatalogProduct } from "/lib/collections/schemas";

const ExtendedCatalogProductSchema = CatalogProduct.extend({
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
