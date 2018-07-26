import React from "react";
import { PropTypes } from "prop-types";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import { Router } from "/client/api";
import ProductGridItemCore from "/imports/plugins/included/product-variant/components/customer/productGridItem";
import Link from "../../Link";


class ProductGridItem extends ProductGridItemCore {
  static propTypes = {
    showFeaturedLabel: PropTypes.bool,
    similarProducts: PropTypes.bool,
    ...ProductGridItemCore.propTypes
  };

  static defaultProps = {
    showFeaturedLabel: true,
    similarProducts: false
  };

  static labelColorPalette = [
    "#2899D3", // blue
    "#40E0D0", // turquoise
    "#F2542F" // orange
  ];

  renderFeaturedProductLabel() {
    const { featuredProductLabel } = this.props.product;
    let bgColor;
    if (featuredProductLabel) {
      const hash = featuredProductLabel.split("").reduce((acc, value, i) => {
        const code = featuredProductLabel.charCodeAt(i);
        return code + acc;
      }, 0);
      bgColor = ProductGridItem.labelColorPalette[hash % 3];
    }
    return (
      <div className="grid-item-featured-product-label" style={bgColor ? { backgroundColor: bgColor } : {}}>
        {featuredProductLabel}
      </div>
    );
  }

  render() {
    const { product, isSearch } = this.props;
    return (
      <li
        className={this.productClassNames}
        data-id={product._id}
        id={product._id}
      >
        <div className={(isSearch) ? "item-content" : ""}>
          <span className="product-grid-item-alerts" />

          <Link
            href={this.productURL}
            className="product-grid-item-images"
            data-event-category="grid"
            data-event-label="grid product click"
            data-event-value={product._id}
          >
            <div className="product-primary-images">
              {this.props.showFeaturedLabel && this.renderFeaturedProductLabel()}
              {this.renderMedia()}
            </div>
            {this.renderAdditionalMedia()}
          </Link>

          {!isSearch && this.renderNotices()}
          {this.renderGridContent()}
        </div>
      </li>
    );
  }
}

replaceComponent("ProductGridItemCustomer", ProductGridItem);

export default ProductGridItem;
