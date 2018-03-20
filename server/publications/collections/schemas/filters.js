import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";

const Schemas = getSchemas();
const ExtendedFilters = Schemas.filters.clone().extend({
  featuredProductLabel: {
    type: String,
    optional: true
  },
  relatedTag: {
    type: String,
    optional: true
  }
});

registerSchema("filters", ExtendedFilters);
