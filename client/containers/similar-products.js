import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Catalog, Shops } from "/lib/collections";
import { Reaction } from "/client/api";
import SimilarProducts from "../components/similar-products";

/**
 * @file
 * Similar Products container
 * Subscribes to products that are related to currently-viewed PDP
 */

const reactiveProductIds = new ReactiveVar([], (oldVal, newVal) => JSON.stringify(oldVal.sort()) === JSON.stringify(newVal.sort()));

function composer(props, onData) {
  const { product } = props;
  const { relatedTagId } = product;
  const filters = {};

  if (relatedTagId) {
    filters.tagIds = [relatedTagId];
  }

  const productsSub = Meteor.subscribe("Products/grid", 5, filters);
  if (productsSub.ready()) {
    const productsCursor = Catalog.find();
    const productIds = productsCursor.map((p) => p._id);
    reactiveProductIds.set(productIds);
    const mediaSub = Meteor.subscribe("ProductGridMedia", productIds);
    const currentShop = Shops.findOne({
      _id: Reaction.getPrimaryShopId()
    });
    const products = productsCursor.fetch().map(({ product }) => product);
    if (mediaSub.ready()) {
      onData(null, {
        ...props,
        products: products,
        shopCurrencyCode: currentShop.currency
      });
    }
  }
}

registerComponent("SimilarProducts", SimilarProducts, composeWithTracker(composer));
