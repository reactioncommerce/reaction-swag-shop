import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Shops, Tags, Catalog } from "/lib/collections";
import { Logger } from "/server/api";
import { getSchemas } from "@reactioncommerce/reaction-collections";


// Validate the subscription filter against our extended filter schema.
const Schemas = getSchemas();
const { filters } = Schemas;

function filterProducts(productFilters) {
  // if there are filter/params that don't match the schema
  // validate, catch except but return no results
  try {
    if (productFilters) filters.validate(productFilters);
  } catch (e) {
    Logger.debug(e, "Invalid Product Filters");
    return false;
  }

  const shopIdsOrSlugs = productFilters && productFilters.shops;

  if (shopIdsOrSlugs) {
    // Get all shopIds associated with the slug or Id
    const shopIds = Shops.find({
      "workflow.status": "active",
      "$or": [{
        _id: { $in: shopIdsOrSlugs }
      }, {
        slug: { $in: shopIdsOrSlugs }
      }]
    }).map((shop) => shop._id);

    // If we found shops, update the productFilters
    if (shopIds) {
      productFilters.shops = shopIds;
    } else {
      return false;
    }
  }

  // Init default selector - Everyone can see products that fit this selector
  const selector = {
    ancestors: [], // Lookup top-level products
    isDeleted: { $in: [null, false] }, // by default, we don't publish deleted products
    isVisible: true // by default, only lookup visible products
  };

  if (productFilters) {
    // handle multiple shops
    if (productFilters.shops) {
      _.extend(selector, {
        shopId: {
          $in: productFilters.shops
        }
      });
    }

    // filter by tags
    if (productFilters.tags) {
      _.extend(selector, {
        hashtags: {
          $in: productFilters.tags
        }
      });
    }

    // filter by query
    if (productFilters.query) {
      const cond = {
        $regex: productFilters.query,
        $options: "i"
      };
      _.extend(selector, {
        $or: [{
          title: cond
        }, {
          pageTitle: cond
        }, {
          description: cond
        }]
      });
    }

    // filter by details
    if (productFilters.details) {
      _.extend(selector, {
        metafields: {
          $elemMatch: {
            key: {
              $regex: productFilters.details.key,
              $options: "i"
            },
            value: {
              $regex: productFilters.details.value,
              $options: "i"
            }
          }
        }
      });
    }

    // filter by visibility
    if (productFilters.visibility !== undefined) {
      _.extend(selector, {
        isVisible: productFilters.visibility
      });
    }

    // filter by gte minimum price
    if (productFilters["price.min"] && !productFilters["price.max"]) {
      _.extend(selector, {
        "price.min": {
          $gte: parseFloat(productFilters["price.min"])
        }
      });
    }

    // filter by lte maximum price
    if (productFilters["price.max"] && !productFilters["price.min"]) {
      _.extend(selector, {
        "price.max": {
          $lte: parseFloat(productFilters["price.max"])
        }
      });
    }

    // filter with a price range
    if (productFilters["price.min"] && productFilters["price.max"]) {
      const pmin = parseFloat(productFilters["price.min"]);
      const pmax = parseFloat(productFilters["price.max"]);
      // where product A has min 12.99 variant and a 19.99 variant
      // price.min=12.99&price.max=19.98
      // should return product A
      _.extend(selector, {
        "price.min": {
          $lt: pmax
        },
        "price.max": {
          $gt: pmin
        }
      });
    }

    // filter by gte minimum weight
    if (productFilters["weight.min"] && !productFilters["weight.max"]) {
      _.extend(selector, {
        weight: {
          $gte: parseFloat(productFilters["weight.min"])
        }
      });
    }

    // filter by lte maximum weight
    if (productFilters["weight.max"] && !productFilters["weight.min"]) {
      _.extend(selector, {
        weight: {
          $lte: parseFloat(productFilters["weight.max"])
        }
      });
    }

    // filter with a weight range
    if (productFilters["weight.min"] && productFilters["weight.max"]) {
      const wmin = parseFloat(productFilters["weight.min"]);
      const wmax = parseFloat(productFilters["weight.max"]);
      _.extend(selector, {
        weight: {
          $lt: wmax,
          $gt: wmin
        }
      });
    }
    // BOF: swag shop featuredProduct filter
    if (Object.prototype.hasOwnProperty.call(productFilters, "featuredProductLabel")) {
      if (productFilters.featuredProductLabel !== "") {
        _.extend(selector, {
          // Return only featured products that match the label exactly
          featuredProductLabel: productFilters.featuredProductLabel
        });
      } else {
        // Return all featured products, regardless of label
        _.extend(selector, {
          featuredProductLabel: {
            $exists: true
          }
        });
      }
    }

    if (Object.prototype.hasOwnProperty.call(productFilters, "relatedTag")) {
      if (productFilters.relatedTag !== "") {
        const tag = Tags.findOne({ name: productFilters.relatedTag });
        if (tag) {
          _.extend(selector, {
            hashtags: tag._id,
            ancestors: { $size: 0 }
          });
        }
      }
    }
    // EOF: swag shop featuredProduct filter
  } // end if productFilters

  return selector;
}

/* Replace stock publication with our custom publication that knows how to filter
 * featured products as well.
 */
Meteor.startup(() => {
  Meteor.default_server.publish_handlers["Products/grid"] = publishFeaturedSwagProducts;
});


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

  const newSelector = filterProducts(productFilters);

  if (newSelector === false) {
    return this.ready();
  }

  const productCursor = Catalog.find(newSelector, {
    sort,
    limit: productScrollLimit,
    fields: {
      variants: 0
    }
  });

  return productCursor;
}
