import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Product } from "/lib/collections/schemas/index";
import { Products } from "/lib/collections/index";
import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";


const ExtendedSchema = new SimpleSchema([
  Product,
  {
    featuredProductLabel: {
      optional: true,
      type: String
    }
  }
]);
Products.attachSchema(ExtendedSchema, { replace: true, selector: { type: "simple" } });
registerSchema("Product", ExtendedSchema);


const Schemas = getSchemas();

const ExtendedFilters = new SimpleSchema([
  Schemas.filters,
  {
    featuredProductLabel: {
      type: String,
      optional: true
    }
  }
]);

registerSchema("filters", ExtendedFilters);
