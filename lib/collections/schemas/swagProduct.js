import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Product } from "/lib/collections/schemas/index";
import { Products } from "/lib/collections/index";
import { getSlug } from "/lib/api/index";
import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";

const ExtendedSchema = new SimpleSchema([
  Product,
  {
    featuredProductLabel: {
      optional: true,
      type: String
    },
    relatedTag: {
      optional: true,
      type: String,
      autoValue() {
        const isSimpleProduct = this.siblingField("type").value === "simple";
        if (isSimpleProduct && this.operator === "$set") {
          const productHandle = this.siblingField("handle").value;
          const slug = getSlug(`${productHandle} related`);
          Meteor.call("createTag", slug);
          return slug;
        }
      }
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
