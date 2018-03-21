import { getSchemas } from "@reactioncommerce/reaction-collections";
import { Tags } from "/lib/collections";

const Schemas = getSchemas();
const TagSchema = Schemas.Tag.extend({
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
});

Tags.attachSchema(TagSchema, { replace: true });
