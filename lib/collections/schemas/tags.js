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
    },
    catTileImageUrl: {
      type: String,
      defaultValue: "",
      optional: true
    },
    catHeroImageUrl: {
      type: String,
      defaultValue: "",
      optional: true
    },
    catHeroSloganI18nKey: {
      type: String,
      defaultValue: "",
      optional: true
    },
    catHeroTitleI18nKey: {
      type: String,
      defaultValue: "",
      optional: true
    }
  }
]);

Tags.attachSchema(TagSchema, { replace: true });
registerSchema("Tag", TagSchema);
