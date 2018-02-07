import { replaceComponent, getHOCs } from "@reactioncommerce/reaction-components";
import CartIcon from "../components/cartIcon";
import Velocity from "velocity-animate";
import { withProps } from "recompose";
import { Reaction } from "/client/api";


const wrapper = (props) => {
  const handlers = {
    handleClick(e) {
      if (props.closeNavbar) {
        props.closeNavbar();
      }
      e.preventDefault();
      const cartDrawer = document.querySelector("#cart-drawer-container");
      Velocity(cartDrawer, { opacity: 1 }, 300, () => {
        Reaction.toggleSession("displayCart");
      });
    }
  };
  return handlers;
};

const hocs = getHOCs("CartIcon");
hocs[0] = withProps(wrapper);

replaceComponent("CartIcon", CartIcon);
