import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";
import { Tags } from "/lib/collections/index";

const Schemas = getSchemas();

export const ExtendedTag = new SimpleSchema([
  Schemas.Tag,
  {
    imageUrl: {
      type: String,
      defaultValue: "",
      optional: true
    }
  }
]);


Tags.attachSchema(ExtendedTag, { replace: true });

registerSchema("Tag", ExtendedTag);
