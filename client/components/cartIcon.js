import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";


const CartIcon = ({ handleClick, cart }) => (
  <div className="cart-icon" onClick={handleClick}>
    <span data-event-category="cart">
      <Components.Translation defaultValue="My cart" i18nKey="myCart" />
      &nbsp;
      <span className="cart-count">
        {cart ? `(${cart.getCount()})` : "(0)"}
      </span>
    </span>
  </div>
);

CartIcon.propTypes = {
  cart: PropTypes.object,
  handleClick: PropTypes.func.isRequired
};

export default CartIcon;

