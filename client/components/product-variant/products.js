import React from "react";
import ProductsCore from "/imports/plugins/included/product-variant/components/products";
import { Components } from "@reactioncommerce/reaction-components";

class Products extends ProductsCore {
  heroClicked = () => {
    alert("clicked");
  }

  renderHero() {
    return (
      <div className="hero">
        <div className="hero__wrapper">
          <div className="hero__slogan">
            <Components.Translation defaultValue={"We heard you like swag."} i18nKey={"weHeardYouLikeSwag"} />
          </div>
          <div className="hero__huge-text">
            <Components.Translation defaultValue={"You’re in the right place."} i18nKey={"youAreInTheRightPlace"} />
          </div>
          <Components.Button
            className="hero__button"
            label={"Shop swag"}
            i18nKeyLabel={"shopSwag"}
            bezelStyle={"solid"}
            primary={true}
            type="button"
            onClick={this.heroClicked}
          />
        </div>
      </div>
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

export default Products;
