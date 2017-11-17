import React from "react";
import UtilityBar from "./utilityBar";
import NavBar from "./navBar";
import { registerComponent } from "@reactioncommerce/reaction-components";


class SwagShopHeader extends React.Component {
  render() {
    return (
      <div>
        <UtilityBar />
        <NavBar />
      </div>
    );
  }
}


registerComponent("SwagShopHeader", SwagShopHeader);

export default SwagShopHeader;
