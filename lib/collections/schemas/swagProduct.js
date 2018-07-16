import Schemas from "@reactioncommerce/schemas";
import { Products } from "/lib/collections";

const ExtendedProductSchema = Schemas.Product.extend({
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

Products.attachSchema(ExtendedProductSchema, { replace: true, selector: { type: "simple" } });
