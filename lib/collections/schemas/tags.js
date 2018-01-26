import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { getSchemas, registerSchema } from "@reactioncommerce/reaction-collections";
import { Tags } from "/lib/collections/index";

const Schemas = getSchemas();

export const ExtendedTag = new SimpleSchema([
  Schemas.Tag,
  {
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


Tags.attachSchema(ExtendedTag, { replace: true });

registerSchema("Tag", ExtendedTag);
