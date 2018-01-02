import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

import { default as ProductGridCore } from "/imports/plugins/included/product-variant/components/productGrid";


class ProductGrid extends ProductGridCore {
  static propTypes = {
    products: PropTypes.array
  }

  // eslint-disable-next-line react/display-name
  renderProductGridItems = (products) => {
    if (Array.isArray(products)) {
      return products.map((product, index) => {
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
        <div className="row">
          <div className="text-center">
            <h3 className="products-we-love-header">
              <Components.Translation defaultValue="Products We Love" i18nKey="productsWeLove" />
            </h3>
          </div>
        </div>
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

export default ProductGrid;
