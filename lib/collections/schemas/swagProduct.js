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
      autoValue: function () {
        const productHandle = this.siblingField("handle").value;
        const ancestors = this.siblingField("ancestors").value;
        const hasNoAncestor = !ancestors || ancestors.length === 0;
        if (!this.value && (productHandle && productHandle !== this.siblingField("_id").value) && hasNoAncestor) {
          console.log("create tag");
          Meteor.call("createTag", getSlug(`${productHandle} related`), "related");
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
