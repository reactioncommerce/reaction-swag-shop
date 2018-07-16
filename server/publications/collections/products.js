import _ from "lodash";
import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Logger from "@reactioncommerce/logger";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import { Shops, Catalog } from "/lib/collections";

const catalogProductFiltersSchema = new SimpleSchema({
  "shopIdsOrSlugs": {
    type: Array,
    optional: true
  },
  "shopIdsOrSlugs.$": String,
  "tagIds": {
    type: Array,
    optional: true
  },
  "tagIds.$": String,
  "query": {
    type: String,
    optional: true
  },
  "featuredProductLabel": {
    type: String,
    optional: true
  },
  "relatedTag": {
    type: String,
    optional: true
  }
});

function applyShopsFilter(selector, shopIdsOrSlugs) {
  // Active shop
  const shopId = Reaction.getShopId();
  const primaryShopId = Reaction.getPrimaryShopId();

  // Don't publish if we're missing an active or primary shopId
  if (!shopId || !primaryShopId) {
    return false;
  }

  let activeShopIds;
  // if the current shop is the primary shop, get products from all shops
  // otherwise, only list products from _this_ shop.
  if (shopId === primaryShopId) {
    activeShopIds = Shops.find({
      $or: [
        { "workflow.status": "active" },
        { _id: primaryShopId }
      ]
    }, {
      fields: {
        _id: 1
      }
    }).fetch().map((activeShop) => activeShop._id);
  } else {
    activeShopIds = [shopId];
  }

  if (!activeShopIds.length) {
    return false;
  }

  if (shopIdsOrSlugs) {
    // Get all shopIds associated with the slug or Id
    const shopIds = Shops.find({
      "workflow.status": "active",
      "$or": [{
        _id: { $in: shopIdsOrSlugs }
      }, {
        slug: { $in: shopIdsOrSlugs }
      }]
    }, {
      fields: {
        _id: 1
      }
    }).map((shop) => shop._id);

    activeShopIds = _.intersection(activeShopIds, shopIds);
  }

  if (activeShopIds.length) {
    return {
      ...selector,
      shopId: { $in: activeShopIds }
    };
  }

  return selector;
}

/* Replace stock publication with our custom publication that knows how to filter
 * featured products as well.
 */
Meteor.startup(() => {
  Meteor.default_server.publish_handlers["Products/grid"] = publishFeaturedSwagProducts;
});

function filterCatalogItems(catalogFilters) {
  // if there are filter/params that don't match the schema
  // validate, catch except but return no results
  try {
    if (catalogFilters) catalogProductFiltersSchema.validate(catalogFilters);
  } catch (e) {
    Logger.warn(e, "Invalid Catalog Product Filters");
    return false;
  }

  // Init default selector - Everyone can see products that fit this selector
  const baseSelector = {
    "product.isDeleted": { $ne: true }, // by default, we don't publish deleted products
    "product.isVisible": true // by default, only lookup visible products
  };

  const { shopIdsOrSlugs } = catalogFilters || {};
  const selector = applyShopsFilter(baseSelector, shopIdsOrSlugs);

  if (!selector) return false;
  if (!catalogFilters) return selector;

  // filter by tags
  if (catalogFilters.tagIds) {
    selector["product.tagIds"] = {
      $in: catalogFilters.tagIds
    };
  }

  // filter by query
  if (catalogFilters.query) {
    const cond = {
      $regex: catalogFilters.query,
      $options: "i"
    };

    selector.$or = [{
      title: cond
    }, {
      pageTitle: cond
    }, {
      description: cond
    }];
  }

  return selector;
}

/**
 * Swag shop products publication. Knows how to filter for featured products.
 * @param {Number} [productScrollLimit] - optional, defaults to 24
 * @param {Array} shops - array of shopId to retrieve product from.
 * @return {Object} return product cursor
 */
function publishFeaturedSwagProducts(productScrollLimit = 24, productFilters, sort = {}) {
  check(productScrollLimit, Number);
  check(productFilters, Match.OneOf(undefined, Object));
  check(sort, Match.OneOf(undefined, Object));

  const newSelector = filterCatalogItems(productFilters);

  if (newSelector === false) {
    return this.ready();
  }

  let tagIdForPosition = "_default";
  if (productFilters && Array.isArray(productFilters.tagIds) && productFilters.tagIds.length) {
    [tagIdForPosition] = productFilters.tagIds;
  }

  return Catalog.find(newSelector, {
    sort: {
      [`product.positions.${tagIdForPosition}.position`]: 1,
      createdAt: -1
    },
    limit: productScrollLimit,
    fields: {
      variants: 0
    }
  });
}
