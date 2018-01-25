import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Tag } from "/lib/collections/schemas";
import { Tags } from "/lib/collections";
import { registerSchema } from "@reactioncommerce/reaction-collections";

const TagSchema = new SimpleSchema([
  Tag,
  {
    type: {
      optional: true,
      type: String,
      defaultValue: "tag"
    }
  }
]);

Tags.attachSchema(TagSchema, { replace: true });
registerSchema("Tag", TagSchema);
