import _ from "lodash";
import { composeWithTracker, getHOCs, replaceComponent } from "@reactioncommerce/reaction-components";
import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { Catalog, Tags, Shops } from "/lib/collections";
import ProductGrid from "../../components/product-variant/customer/productGrid";

const reactiveProductIds = new ReactiveVar([], (oldVal, newVal) => JSON.stringify(oldVal.sort()) === JSON.stringify(newVal.sort()));

/*
 * Customized version of imports/plugins/included/product-variant/containers/productsContainerCustomer.js
 * It subscribes to featured products only for landing page section "Products we love"
 */
function composer(props, onData) {
  window.prerenderReady = false;

  let canLoadMoreProducts = false;

  const queryParams = {};
  const slug = Reaction.Router.getParam("slug");
  const shopIdOrSlug = Reaction.Router.getParam("shopSlug");
  let tagIdForPosition = "_default";

  if (slug) {
    const tag = Tags.findOne({ slug }) || Tags.findOne({ _id: slug });

    // if we get an invalid slug, don't return all products
    if (!tag) {
      onData(null, {
        showNotFound: true
      });

      return;
    }
    queryParams.tagIds = [tag._id];
    tagIdForPosition = tag._id;
  }

  if (shopIdOrSlug) {
    queryParams.shopIdsOrSlugs = [shopIdOrSlug];
  }

  const queryString = Reaction.Router.current().query;
  if (queryString) {
    queryParams.query = queryString.query;
  }

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

  const scrollLimit = Session.get("productScrollLimit");
  const productsSubscription = Meteor.subscribe("Products/grid", scrollLimit, queryParams);

  if (productsSubscription.ready()) {
    window.prerenderReady = true;
  }

  const activeShopsIds = Shops.find({
    $or: [
      { "workflow.status": "active" },
      { _id: Reaction.getPrimaryShopId() }
    ]
  }).map((activeShop) => activeShop._id);

  const catalogCursor = Catalog.find({
    "product.type": "product-simple",
    "shopId": { $in: activeShopsIds }
  }, {
    $sort: {
      [`product.positions.${tagIdForPosition}.position`]: 1,
      createdAt: -1
    }
  });

  canLoadMoreProducts = catalogCursor.count() >= scrollLimit;

  // BOF: swag shop tags for category tiles
  tags = Tags.find({
    isTopLevel: true,
    catTileImageUrl: {
      $exists: true,
      $ne: ""
    }
  }, { sort: { position: 1 } }).fetch();
  tags = _.sortBy(tags, "position"); // puts tags without position at end of array
  // EOF: swag shop tags for category tiles

  const products = catalogCursor.map((catalogItem) => catalogItem.product);

  const currentShop = Shops.findOne({
    _id: Reaction.getPrimaryShopId()
  });

  onData(null, {
    canLoadMoreProducts,
    products,
    productsSubscription,
    shopCurrencyCode: currentShop.currency,
    tags
  });
}

const higherOrderFuncs = getHOCs("ProductsCustomer");
higherOrderFuncs[0] = composeWithTracker(composer);

replaceComponent("ProductsCustomer", ProductGrid);
