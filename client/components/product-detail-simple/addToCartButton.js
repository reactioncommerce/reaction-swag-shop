import React from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent, getRawComponent } from "@reactioncommerce/reaction-components";

class AddToCartButton extends getRawComponent("AddToCartButton") {
  constructor(props) {
    super(props);
    this.state = {
      value: props.cartQuantity,
      ...this.state
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.cartQuantity
    });
  }

  add = (value) => {
    this.setState((prev) => {
      if (prev.value === 1 && value < 0) {
        return {
          value: 1
        };
      }
      return {
        value: prev.value + value
      };
    });
  };

  render() {
    if (this.hasVariants) {
      return (
        <div className="pdp add-to-cart block">
          <input
            className="form-control input-md"
            id="add-to-cart-quantity"
            min="1"
            name="addToCartQty"
            onChange={this.handleCartQuantityChange}
            type="number"
            value={this.state.value}
          />
          <div className="spin-buttons">
            <i onClick={() => this.add(1)} className="fa fa-angle-up" role="presentation"/>
            <i onClick={() => this.add(-1)} className="fa fa-angle-down" role="presentation"/>
          </div>
          <button
            className="input-group-addon add-to-cart-text js-add-to-cart"
            data-i18n="productDetail.addToCart"
            onClick={this.props.onClick || this.props.onAddToCart}
          >
            <Components.Translation defaultValue="Add to cart" i18nKey="productDetail.addToCart" />
          </button>
        </div>
      );
    }

    if (this.props.editable && this.hasVariants === false) {
      return (
        <Components.Alert>
          <Components.Translation defaultValue="Add options to enable 'Add to Cart' button" i18nKey="productVariant.addVariantOptions" />
        </Components.Alert>
      );
    }
    return null;
  }
}

AddToCartButton.propTypes = {
  cartQuantity: PropTypes.number,
  editable: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onCartQuantityChange: PropTypes.func,
  onClick: PropTypes.func,
  variants: PropTypes.arrayOf(PropTypes.object)
};

replaceComponent("AddToCartButton", AddToCartButton);


