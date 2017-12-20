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

  renderWordOfTheDay() {
    return (
      <div className={"word-of-the-day"}>
        <div className={"word-of-the-day__header"}>
          <Components.Translation defaultValue={"#MADEINTHESUNSHINE"} i18nKey={"wordOfTheDayHeader"} />
        </div>
        <div className={"word-of-the-day__text"}>
          <Components.Translation defaultValue={"Lorem ipsum dolore ununoctium sed posuere consectetur est"} i18nKey={"wordOfTheDayText"} />
        </div>
      </div>
    );
  }

  renderImageGallery() {
    return (
      <div className="row image-gallery">
        <div className="col-xs-12 col-sm-5ths col-sm-push-2">
          <img alt="Instagram" src={"/plugins/reaction-swag-shop/palms.png"} />
        </div>
        <div className="col-xs-6 col-sm-5ths col-sm-pull-1">
          <img alt="Frames" src={"/plugins/reaction-swag-shop/frames.png"} />
        </div>
        <div className="col-xs-6 col-sm-5ths col-sm-pull-1">
          <img alt="Box" src={"/plugins/reaction-swag-shop/box.png"} />
        </div>
        <div className="col-xs-6 col-sm-5ths">
          <img alt="Sticker" src={"/plugins/reaction-swag-shop/sticker.png"} />
        </div>
        <div className="col-xs-6 col-sm-5ths">
          <img alt="T-Shirt" src={"/plugins/reaction-swag-shop/t-shirt.png"} />
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
            {this.renderWordOfTheDay()}
            {this.renderImageGallery()}
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
