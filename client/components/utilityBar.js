import React from "react";
import { Components } from "@reactioncommerce/reaction-components";

const UtilityBar = (props, context) => {
  const visibility = {
    hamburger: false,
    brand: false,
    tags: false,
    search: false,
    notifications: false,
    languages: true,
    currency: false,
    mainDropdown: true,
    cartContainer: false
  };
  const newProps = {
    ...props,
    visibility
  };
  return (
    <div className={"utility-bar"}>
      <div className={"utility-bar-hashtag"}>{"#madeinthesunshine"}</div>
      <div className={"utility-bar-news"}>
        <a href="/news">{"Reaction News: v1.1 releases"}&nbsp;&mdash;&nbsp;{"See what's new"}</a></div>
      <div className={"utility-bar__main"}>
        {React.createElement(Components.NavBar, newProps, context)}
      </div>
    </div>
  );
};

export default UtilityBar;
