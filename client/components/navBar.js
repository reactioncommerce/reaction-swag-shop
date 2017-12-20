import React from "react";
import { Components } from "@reactioncommerce/reaction-components";
import { default as NavBarCore } from "/imports/plugins/core/ui-navbar/client/components/navbar";


class NavBar extends NavBarCore {
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
        <div onClick={this.handleOpenSearchModal} className="search">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
          />
          <Components.Translation defaultValue="search" i18nKey="admin.dashboard.searchLabel" />
        </div>
      );
    }
  }
}

export default NavBar;

