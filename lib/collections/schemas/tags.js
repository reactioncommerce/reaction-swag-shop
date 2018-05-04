import Schemas from "@reactioncommerce/schemas";
import { Tags } from "/lib/collections";

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
