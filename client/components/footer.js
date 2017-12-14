import React from "react";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
// import NavBar from "./navBar";

class SwagShopFooter extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      email: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      email: event.currentTarget.value
    });
  }

  handleFieldBlur = () => {
    console.log("blur field");

  }

  renderEmailForm() {
    return (
      <div className={"col-xs-12 col-sm-6"}>
        <div className={"get-in-contact"}>
          <div className={"email-form-header"}>REACTION COMMERCE</div>
          <div className={"email-form-subheader"}>GET A DEMO</div>
          <div>Create a premiere ecommerce experience
            by partnering with Reaction. Contact us for more information!</div>
          <div className={"email-form"}>
            <Components.TextField
              i18nKeyPlaceholder="emailAddress"
              name="email"
              onBlur={this.handleFieldBlur}
              onChange={this.handleChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="email address"
              ref="emailInput"
              value={this.state.email}
            />
            <div className={"field-arrow-right"}>
              <i className="fa fa-long-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNavigation() {
    return (
      <div className={"tagnav col-xs-12 col-sm-offset-1 col-sm-1"}>
        <div className={"navbar-item"}>
          <Components.Brand logo={""} title={"SHOP"} />
        </div>
        <Components.FooterTagNav
          isVisible={false}
          closeNavbar={function () {}}
        >
          <Components.Brand />
        </Components.FooterTagNav>
      </div>
    );
  }

  renderSupportLinks() {
    return (
      <div className={"col-xs-12  col-sm-1"}>
        support links
      </div>
    );
  }

  renderCompanyLinks() {
    return (
      <div className={"col-xs-12  col-sm-1"}>
        company links
      </div>
    );
  }

  renderSocialLinks() {
    return (
      <div className={"col-xs-12 col-sm-1"}>
        Social links
      </div>
    );
  }

  renderBottomLine() {
    return (
      <div className={"bottomline row"}>
        &copy;{"2017 REACTION COMMERCE, INC. Privacy & Terms"}
      </div>
    );
  }

  render() {
    return (
      <div className={"footer container-fluid"}>
        <div className={"footer-main row"}>
          {this.renderEmailForm()}
          {this.renderNavigation()}
          {this.renderSupportLinks()}
          {this.renderCompanyLinks()}
          {this.renderSocialLinks()}
        </div>
        {this.renderBottomLine()}
      </div>
    );
  }
}

registerComponent("SwagShopFooter", SwagShopFooter);

export default SwagShopFooter;
