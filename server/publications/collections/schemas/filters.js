import Schemas from "@reactioncommerce/schemas";

Schemas.filters.extend({
  featuredProductLabel: {
    type: String,
    optional: true
  },
  relatedTag: {
    type: String,
    optional: true
  }
});
