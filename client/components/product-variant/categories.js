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
    const slug = Reaction.Router.getParam("slug");
    const tag = this.props.tags.find(x => x.slug === slug);
    return (
      <div className="cat-hero" style={{ backgroundImage: `url('/plugins/reaction-swag-shop/${tag.catHeroImageUrl}')` }} >
        <div className="cat-hero-wrapper">
          <div className="cat-hero-slogan">
            <Components.Translation defaultValue={"Lorem ipsum"} i18nKey={tag.catHeroSloganI18nKey} />
          </div>
          <div className="cat-hero-huge-text">
            <Components.Translation defaultValue={"Nuro laudio vid pastum"} i18nKey={tag.catHeroTitleI18nKey} />
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
