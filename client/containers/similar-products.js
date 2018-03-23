import { Meteor } from "meteor/meteor";
// import { ReactiveVar } from "meteor/reactive-var";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Catalog } from "/lib/collections";
import SimilarProducts from "../components/similar-products";


// const reactiveProductIds = new ReactiveVar([], (oldVal, newVal) => JSON.stringify(oldVal.sort()) === JSON.stringify(newVal.sort()));

function composer(props, onData) {
  const { product } = props;
  const queryParams = {
    relatedTag: product.relatedTag ? product.relatedTag : ""
  };
  const productsSub = Meteor.subscribe("Products/grid", 5, queryParams);
  if (productsSub.ready()) {
    const products = Catalog.find();
    const productIds = products.map((p) => p._id);
    // reactiveProductIds.set(productIds);
    const mediaSub = Meteor.subscribe("ProductGridMedia", productIds);
    if (mediaSub.ready()) {
      onData(null, {
        ...props,
        products: products.fetch()
      });
    }
  }
}

registerComponent("SimilarProducts", SimilarProducts, composeWithTracker(composer));
