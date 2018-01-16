import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";

import { default as ProductGridCore } from "/imports/plugins/included/product-variant/components/productGrid";


class ProductGrid extends ProductGridCore {
  static propTypes = {
    products: PropTypes.array,
    shouldRenderSectionHeader: PropTypes.bool
  }

  static defaultProps = {
    shouldRenderSectionHeader: true
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
