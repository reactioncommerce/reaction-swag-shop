import React from "react";
import { Components, getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
// import NavBarCore from "/imports/plugins/core/ui-navbar/client/components/navbar";


class NavBar extends getRawComponent("NavBar") {
  static defaultProps = {
    visibility: {
      hamburger: true,
      brand: true,
      tags: true,
      search: true,
      notifications: false,
      languages: false,
      currency: false,
      mainDropdown: false,
      cartContainer: true
    }
  };

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div onClick={this.handleOpenSearchModal} className="search" role="presentation">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
          />
          <Components.Translation className="search-label" defaultValue="search" i18nKey="admin.dashboard.searchLabel" />
        </div>
      );
    }
  }
}

replaceComponent("NavBar", NavBar);

export default NavBar;

