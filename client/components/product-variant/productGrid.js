import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";

import { default as ProductGridCore } from "/imports/plugins/included/product-variant/components/productGrid";
import { Reaction } from "/client/api";


class ProductGrid extends ProductGridCore {
  static propTypes = {
    products: PropTypes.array,
    shouldRenderSectionHeader: PropTypes.bool
  }

  static defaultProps = {
    shouldRenderSectionHeader: true
  }

  renderProductGridItems = (products) => {
    if (Array.isArray(products)) {
      const slug = Reaction.Router.getParam("slug");
      if (slug) {
        const insertAt = products.length && Math.ceil(products.length / 2) || 0;
        products.splice(insertAt, 0, { src: "/plugins/reaction-swag-shop/mountain-road.jpg" });
      }
      return products.map((product, index) => {
        if (product.src) {
          return (
            <li className={"product-grid-item product-medium"}>
              <img className={"filler-img"} alt={"Road in the mountains."} src={product.src} />
            </li>
          );
        }

        return (
          <Components.ProductGridItems
            {...this.props}
            product={product} key={index} index={index}
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="text-center">
          <h3>
            <Components.Translation defaultValue="No Products Found" i18nKey="app.noProductsFound" />
          </h3>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-main">
        {this.props.shouldRenderSectionHeader &&
          <div className="row">
            <div className="text-center">
              <h3 className="products-we-love-header">
                <Components.Translation defaultValue="Products We Love" i18nKey="productsWeLove" />
              </h3>
            </div>
          </div>}
        <div className="product-grid">
          <Components.DragDropProvider>
            <ul className="product-grid-list list-unstyled" id="product-grid-list">
              {this.renderProductGridItems(this.props.products)}
            </ul>
          </Components.DragDropProvider>
        </div>
      </div>
    );
  }
}

replaceComponent("ProductGrid", ProductGrid);

export default ProductGrid;
