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

  renderNavigation() {
    return (
      <div className={"footer__tagnav"}>
        <Components.Brand logo={""} title={"Shop"} />

        <div className="menu">
          <Components.FooterTagNav
            isVisible={false}
            closeNavbar={function () {}}
          >
            <Components.Brand />
          </Components.FooterTagNav>
        </div>

      </div>
    );
  }

  renderSocialLinks() {
    return null;
  }

  renderBottomLine() {
    return (
      <div className={"footer__bottomline"}>
        &copy;{"2017 REACTION COMMERCE, INC. Privacy & Terms"}
      </div>
    );
  }

  renderEmailForm() {
    return (
      <div className={"footer__get-in-contact"}>
        <div className={"footer__email-form-header"}>REACTION COMMERCE</div>
        <div className={"footer__email-form-subheader"}>GET A DEMO</div>
        <div>Create a premiere ecommerce experience
        by partnering with Reaction. Contact us for more information!</div>

        <div className={"footer__email-form"}>
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
          <div className={"footer__field-arrow-right"}>
            <i className="fa fa-long-arrow-right"></i>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={"footer"}>
        <div className={"footer__main"}>
          {this.renderEmailForm()}
          {this.renderNavigation()}
          {this.renderSocialLinks()}
        </div>
        {this.renderBottomLine()}
      </div>
    );
  }
}

registerComponent("SwagShopFooter", SwagShopFooter);

export default SwagShopFooter;
