import React from "react";
import ProductGridItemsCore from "/imports/plugins/included/product-variant/components/productGridItems";


class ProductGridItems extends ProductGridItemsCore {
  renderFeaturedProductLabel() {
    return (
      <div className="grid-item__featured-product-label">
        {this.props.product.featuredProductLabel}
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