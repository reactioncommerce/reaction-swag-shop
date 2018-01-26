import { Meteor } from "meteor/meteor";
import { registerComponent, getHOCs } from "@reactioncommerce/reaction-components";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Tags, Products } from "/lib/collections";

import SimilarProducts from "../components/similar-products/similar-products";


function composer(props, onData) {
  const { product } = props;
  const ProductsSub = Meteor.subscribe("Products", 100);
  if (ProductsSub.ready()) {
    const tag = Tags.findOne({ name: product.relatedTag }, { _id: 1 });
    let similarProducts = [];
    if (tag) {
      similarProducts = Products.find({
        hashtags: tag._id,
        ancestors: { $size: 0 }
      }).fetch();
    }
    onData(null, {
      ...props,
      products: similarProducts
    });
  }
}

registerComponent("SimilarProducts", SimilarProducts, [...getHOCs("ProductDetail"), composeWithTracker(composer)]);

export default composeWithTracker(composer)(SimilarProducts);
