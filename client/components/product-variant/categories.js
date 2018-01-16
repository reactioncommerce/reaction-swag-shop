import React from "react";
import ProductsCore from "/imports/plugins/included/product-variant/components/products";
import { Components, registerComponent, getHOCs } from "@reactioncommerce/reaction-components";
import { Logger } from "/client/api";
import { Reaction } from "/client/api";
import { getTagIds as getIds } from "/lib/selectors/tags";

class Categories extends ProductsCore {
  heroClicked = () => {
    Logger.info("clicked");
  }

  renderHero() {
    return (
      <div className="cat-hero">
        <div className="cat-hero__wrapper">
          <div className="cat-hero__slogan">
            <Components.Translation defaultValue={"Code in style."} i18nKey={"codeInStyle"} />
          </div>
          <div className="cat-hero__huge-text">
            <Components.Translation defaultValue={"Your everyday essentials."} i18nKey={"yourEverydayEssentials"} />
          </div>
        </div>
      </div>
    );
  }

  shopAllLabel() {
    return (
      <span><Components.Translation defaultValue={"Shop all products"} i18nKey={"shopAllProducts"} />&nbsp;<i className="fa fa-long-arrow-right" /></span>
    );
  }

  /**
   * Render product grid
   * @access protected
   * @return {Node} React node containing the `ProductGrid` component.
   */
  renderProductGrid() {
    const products = this.props.products;

    const productsByKey = {};

    if (Array.isArray(products)) {
      for (const product of products) {
        productsByKey[product._id] = product;
      }
    }

    return (
      <Components.ProductGrid
        productsByKey={productsByKey || {}}
        productIds={getIds({ tags: products })}
        canEdit={Reaction.hasPermission("createProduct")}
        products={products}
        shouldRenderSectionHeader={false}
      />
    );
  }

  render() {
    // Force show the not-found view.
    if (this.props.showNotFound) {
      return this.renderNotFound();
    } else if (this.props.ready()) {
      // Render products grid if products are available after subscription ready.
      if (this.hasProducts) {
        return (
          <div id="container-main">
            {this.renderHero()}
            {this.renderProductGrid()}
            {this.renderLoadMoreProductsButton()}
            {this.renderSpinner()}
          </div>
        );
      }

      // Render not-found view if no products are available.
      return this.renderNotFound();
    }

    // Render loading component by default if no condition above matches.
    return this.renderSpinner();
  }
}

const higherOrderFuncs = getHOCs("Products");
registerComponent("Categories", Categories, higherOrderFuncs);

export default Categories;
