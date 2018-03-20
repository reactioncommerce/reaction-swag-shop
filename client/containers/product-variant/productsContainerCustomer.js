import _ from "lodash";
import { composeWithTracker, getHOCs, replaceComponent } from "@reactioncommerce/reaction-components";
// import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { Catalog, Tags, Shops } from "/lib/collections";
import ProductGrid from "../../components/product-variant/customer/productGrid";

// const reactiveProductIds = new ReactiveVar([], (oldVal, newVal) => JSON.stringify(oldVal.sort()) === JSON.stringify(newVal.sort()));

/*
 * Customized version of imports/plugins/included/product-variant/containers/productsContainerCustomer.js
 * It subscribes to featured products only for landing page section "Products we love"
 */
function composer(props, onData) {
  window.prerenderReady = false;

  let canLoadMoreProducts = false;

  const slug = Reaction.Router.getParam("slug");
  const shopIdOrSlug = Reaction.Router.getParam("shopSlug");

  const tag = Tags.findOne({ slug }) || Tags.findOne(slug);
  // BOF: swag shop featuredProduct filter
  // const scrollLimit = Session.get("productScrollLimit");
  // EOF: swag shop featuredProduct filter

  let tags = {}; // this could be shop default implementation needed
  let shopIds = {};

  if (tag) {
    tags = { tags: [tag._id] };
  }

  if (shopIdOrSlug) {
    shopIds = { shops: [shopIdOrSlug] };
  }

  // if we get an invalid slug, don't return all products
  if (!tag && slug) {
    onData(null, {
      showNotFound: true
    });

    return;
  }

  const currentTag = ReactionProduct.getTag();

  const sort = {
    [`positions.${currentTag}.position`]: 1,
    [`positions.${currentTag}.createdAt`]: 1,
    createdAt: 1
  };

  const queryParams = Object.assign({}, tags, Reaction.Router.current().query, shopIds);
  // BOF: swag shop featuredProduct filter
  let swagShopScrollLimit;
  if (slug) {
    // e.g. route /tag/:slug?
    swagShopScrollLimit = Session.get("productScrollLimit");
  } else {
    // e.g. index route /
    // Only interested in first 3 products for "Products we love" section
    swagShopScrollLimit = 3;
    queryParams.featuredProductLabel = ""; // subscribe to all featured products, regardless of label
  }

  const productsSubscription = Meteor.subscribe("Products/grid", swagShopScrollLimit, queryParams, sort);
  // EOF: swag shop featuredProduct filter

  if (productsSubscription.ready()) {
    window.prerenderReady = true;
  }

  const activeShopsIds = Shops.find({
    $or: [
      { "workflow.status": "active" },
      { _id: Reaction.getPrimaryShopId() }
    ]
  }).map((activeShop) => activeShop._id);

  const productCursor = Catalog.find({
    ancestors: [],
    type: { $in: ["product-simple"] },
    shopId: { $in: activeShopsIds }
  }, {
    $sort: sort
  });

  canLoadMoreProducts = productCursor.count() >= Session.get("productScrollLimit");

  // BOF: swag shop tags for category tiles
  tags = Tags.find({ isTopLevel: true }, { sort: { position: 1 } }).fetch();
  tags = _.sortBy(tags, "position"); // puts tags without position at end of array
  // EOF: swag shop tags for category tiles

  const products = productCursor.fetch();
  const productIds = products.map((p) => p._id);

  const mediaSub = Meteor.subscribe("ProductGridMedia", productIds);
  // reactiveProductIds.set(productIds);

  if (mediaSub.ready()) {
    onData(null, {
      canLoadMoreProducts,
      products,
      productsSubscription,
      tags
    });
  }
}

const higherOrderFuncs = getHOCs("ProductsCustomer");
higherOrderFuncs[0] = composeWithTracker(composer);

replaceComponent("ProductsCustomer", ProductGrid);
