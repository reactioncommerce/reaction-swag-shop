import React from "react";
import { Components, getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";


class MainDropdown extends getRawComponent("MainDropdown") {
  renderSignInComponent() {
    return (
      <div className="accounts-dropdown">
        <div className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000">
          <span><Components.Translation defaultValue="Sign In" i18nKey="accountsUI.signIn" /></span><b className="caret" />
        </div>
        <div
          className="accounts-dialog accounts-layout dropdown-menu pull-right"
          style={{ padding: "10px 20px" }}
        >
          <Components.Login />
        </div>
      </div>
    );
  }
}

replaceComponent("MainDropdown", MainDropdown);
