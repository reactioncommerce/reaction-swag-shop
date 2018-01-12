import React from "react";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import ProductGridItemsCore from "/imports/plugins/included/product-variant/components/productGridItems";

class ProductGridItems extends ProductGridItemsCore {
  static labelColorPalette = [
    "#2899D3", // blue
    "#40e0d0", // turquoise
    "#F2542F"  // orange
  ];

  renderFeaturedProductLabel() {
    const featuredProductLabel = this.props.product.featuredProductLabel;
    let bgColor;
    if (featuredProductLabel) {
      const hash = featuredProductLabel.split("").reduce((acc, value, i) => {
        const code = featuredProductLabel.charCodeAt(i);
        return code + acc;
      }, 0);
      bgColor = ProductGridItems.labelColorPalette[hash % 3];
    }
    return (
      <div className="grid-item__featured-product-label" style={bgColor ? { backgroundColor: bgColor } : {}}>
        {featuredProductLabel}
      </div>
    );
  }

  render() {
    const productItem = (
      <li
        className={`product-grid-item ${this.renderPinned()} ${this.props.weightClass()} ${this.props.isSelected()}`}
        data-id={this.props.product._id}
        id={this.props.product._id}
      >
        <div className={this.renderHoverClassName()}>
          <span className="product-grid-item-alerts" />

          <a className="product-grid-item-images"
            href={this.props.pdpPath()}
            data-event-category="grid"
            data-event-label="grid product click"
            data-event-value={this.props.product._id}
            onDoubleClick={this.handleDoubleClick}
            onClick={this.handleClick}
          >
            <div className={`product-primary-images ${this.renderVisible()}`}>
              {this.renderFeaturedProductLabel()}
              {this.renderMedia()}
              {this.renderOverlay()}
            </div>

            {this.renderAdditionalMedia()}
          </a>

          {!this.props.isSearch && this.renderNotices()}
          {this.renderGridContent()}
        </div>
      </li>
    );

    if (this.props.canEdit) {
      return (
        this.props.connectDropTarget(
          this.props.connectDragSource(productItem)
        )
      );
    }

    return productItem;
  }
}

export default ProductGridItems;


replaceComponent("ProductGridItems", ProductGridItems);
