import React from "react";
import { Components } from "@reactioncommerce/reaction-components";

const NavBar = (props, context) => {
  const visibility = {
    hamburger: true,
    brand: true,
    tags: true,
    search: true,
    notifications: false,
    languages: false,
    currency: false,
    mainDropdown: false,
    cartContainer: true
  };
  const newProps = {
    ...props,
    visibility
  };
  return React.createElement(Components.NavBar, newProps, context);
};

export default NavBar;
