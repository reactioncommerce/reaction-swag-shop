import React from "react";
import { Components, getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
import { i18next } from "/client/api";


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
        <div className="search">
          <Components.FlatButton
            kind="flat"
            onClick={this.handleOpenSearchModal}
          >
            <span>{i18next.t("admin.dashboard.searchLabel", "Search")}</span>
            &nbsp;
            <i className="fa fa-search"/>
          </Components.FlatButton>
          <Components.SearchSubscription
            open={this.state.searchModalOpen}
            onClose={this.handleCloseSearchModal}
          />
        </div>
      );
    }
  }
}

replaceComponent("NavBar", NavBar);

export default NavBar;

