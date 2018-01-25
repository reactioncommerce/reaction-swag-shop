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
        const productHandle = this.siblingField("handle").value;
        const ancestors = this.siblingField("ancestors").value;
        const hasNoAncestor = !ancestors || ancestors.length === 0;
        if (!this.value && (productHandle && productHandle !== this.siblingField("_id").value) && hasNoAncestor) {
          // Can't use Meteor.call("shop/createTag") as we have to add `type` field.
          methods.createTag(getSlug(`${productHandle} related`), "related");
          return getSlug(`${productHandle} related`);
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
