import { getSchemas } from "@reactioncommerce/reaction-collections";

const Schemas = getSchemas();
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
