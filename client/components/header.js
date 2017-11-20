import React from "react";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import UtilityBar from "./utilityBar";
// import NavBar from "../containers/navBar";


class SwagShopHeader extends React.Component {
  render() {
    return (
      <div>
        <UtilityBar />
        <Components.NavBar/>
      </div>
    );
  }
}


registerComponent("SwagShopHeader", SwagShopHeader);

export default SwagShopHeader;
