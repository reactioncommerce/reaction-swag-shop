import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Product } from "/lib/collections/schemas";
import { Products } from "/lib/collections";
import { getSlug } from "/lib/api";
import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";
import methods from "../methods";


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
      autoValue: function () {
        const productTitle = this.siblingField("title").value;
        const ancestors = this.siblingField("ancestors").value;
        if (!this.value && (productTitle && productTitle !== this.siblingField("_id").value) && ancestors && ancestors.length === 0) {
          // Can't use Meteor.call("shop/createTag") as we have to add `type` field.
          methods.createTag(getSlug(`${productTitle} related`), "related");
          return getSlug(`${productTitle} realted`);
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
