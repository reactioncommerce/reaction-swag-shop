import React from "react";
import ProductsCore from "/imports/plugins/included/product-variant/components/products";
import { Components } from "@reactioncommerce/reaction-components";
import { Logger } from "/client/api";

class Products extends ProductsCore {
  heroClicked = () => {
    Logger.info("clicked");
  }

  renderHero() {
    return (
      <div className="hero">
        <div className="hero-wrapper">
          <div className="hero-slogan">
            <Components.Translation defaultValue={"We heard you like swag."} i18nKey={"weHeardYouLikeSwag"} />
          </div>
          <div className="hero-huge-text">
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

  renderCategory(tag) {
    return (
      <div className={"cat-tile col-xs-12"} key={tag._id}>
        <a href={`/tag/${tag.slug}`}>
          <img alt={tag.name} src={`/plugins/reaction-swag-shop/${tag.catTileImageUrl}`} />
          <span className={"category"}>{tag.name}</span>
        </a>
      </div>
    );
  }

  renderCategoryChunks(tags) {
    const chunk = 2;
    let chunks = [];
    for (let i = 0; i < tags.length; i += chunk) {
      const temp = tags.slice(i, i + chunk);
      let className = "col-sm-4";
      if (i === 0) {
        className += " col-sm-pull-4";
      }
      chunks.push(
        <div className={className} key={i}>
          {temp.map((element, index) => this.renderCategory(element, index))}
        </div>
      );
    }
    return chunks;
  }

  shopAllLabel() {
    return (
      <span><Components.Translation defaultValue={"Shop all products"} i18nKey={"shopAllProducts"} />&nbsp;<i className="fa fa-long-arrow-right" /></span>
    );
  }

  renderCategories() {
    return (
      <div className={"categories row"}>
        <div className={"cat-tile col-xs-12 col-sm-push-4 col-sm-4"}>
          <div className={"pic-essentials"}>
            <div className={"btn-essentials"}>
              <Components.Button
                className={"btn-blue"}
                label={this.shopAllLabel()}
                bezelStyle={"solid"}
                primary={false}
                type="button"
                onClick={this.heroClicked}
              />
            </div>
          </div>
        </div>
        {this.renderCategoryChunks(this.props.tags)}
      </div>
    );
  }

  renderWordOfTheDay() {
    return (
      <div className={"word-of-the-day"}>
        <div className={"word-of-the-day-header"}>
          <Components.Translation defaultValue={"#MADEINTHESUNSHINE"} i18nKey={"wordOfTheDayHeader"} />
        </div>
        <div className={"word-of-the-day-text"}>
          <Components.Translation defaultValue={"Lorem ipsum dolore ununoctium sed posuere consectetur est"} i18nKey={"wordOfTheDayText"} />
        </div>
      </div>
    );
  }

  renderImageGallery() {
    return (
      <div className="row image-gallery">
        <div className="col-xs-12 col-sm-5ths col-sm-push-2">
          <a href={"https://www.instagram.com/reactioncommerce/"} alt={"instagram"}>
            <img alt="Instagram" src={"/plugins/reaction-swag-shop/palms.png"} />
          </a>
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
            {this.props.tags && this.renderCategories()}
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
