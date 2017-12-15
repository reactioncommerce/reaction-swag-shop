import React from "react";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import { Card, CardHeader, CardBody } from "/imports/plugins/core/ui/client/components";


class SwagShopFooter extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      email: "",
      expandedCards: ["shop", "support", "company", "followus"]
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

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  onWindowResize = () => {
    const matchQuery = window.matchMedia("(max-width: 768px)");
    if (matchQuery.matches) {
      this.setState({
        expandedCards: []
      });
    } else {
      this.setState({
        expandedCards: ["shop", "support", "company", "followus"]
      });
    }
  }

  onExpand = (event, card, groupName) => {
    if (this.state.expandedCards.includes(groupName)) {
      this.setState({
        expandedCards: []
      });
    } else {
      this.setState({
        expandedCards: [groupName]
      });
    }
  }

  isExpanded = (groupName) => {
    return this.state.expandedCards.includes(groupName);
  }

  renderEmailForm() {
    return (
      <div className={"col-xs-12 col-sm-4 col-lg-6 get-in-contact"}>
        <div className={"email-form"}>
          <div className={"email-form-header"}>REACTION COMMERCE</div>
          <div className={"email-form-subheader"}>GET A DEMO</div>
          <div>Create a premiere ecommerce experience
            by partnering with Reaction. Contact us for more information!
          </div>
          <div className={"email-form-field"}>
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
      <div className={"col-xs-12 col-sm-2 col-lg-offset-1 col-lg-1 navigation"}>
        <Card
          name={"shop"}
          onExpand={this.onExpand}
          expanded={this.isExpanded("shop")}
        >
          <CardHeader
            actAsExpander={true}
            title={"Shop"}
            i18nKeyTitle={"shop"}
          />
          <CardBody expandable={true} padded={false}>
            <div className={"navbar-item"}>
              <Components.Brand logo={""} title={"SHOP"}/>
            </div>
            <Components.FooterTagNav
              isVisible={false}
              closeNavbar={function () {
              }}
            >
              <Components.Brand/>
            </Components.FooterTagNav>
          </CardBody>
        </Card>
      </div>
    );
  }


  renderSupportLinks() {
    return (
      <div className={"col-xs-12 col-sm-2 col-lg-1 support"}>
        <Card
          name={"support"}
          onExpand={this.onExpand}
          expanded={this.isExpanded("support")}
        >
          <CardHeader
            actAsExpander={true}
            title={"Support"}
            i18nKeyTitle={"support"}
          />
          <CardBody expandable={true} padded={false}>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Shipping" i18nKey="shipping"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Returns" i18nKey="returns"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="FAQs" i18nKey="faqs"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Size & Fit" i18nKey="sizeAndFit"/>
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderCompanyLinks() {
    return (
      <div className={"col-xs-12 col-sm-2 col-lg-1 company"}>
        <Card
          name={"company"}
          onExpand={this.onExpand}
          expanded={this.isExpanded("company")}
        >
          <CardHeader
            actAsExpander={true}
            title={"Company"}
            i18nKeyTitle={"company"}
          />
          <CardBody expandable={true} padded={false}>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="About" i18nKey="about"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Blog" i18nKey="blog"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Contact" i18nKey="contact"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Careers" i18nKey="careers"/>
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                <Components.Translation defaultValue="Press" i18nKey="press"/>
              </a>
            </div>
          </CardBody>
        </Card>

        {/*<div className={"links-section-header"}>
          <Components.Translation defaultValue="Company" i18nKey="company"/>
        </div>*/}

      </div>
    );
  }

  renderSocialLinks() {
    return (
      <div className={"col-xs-12 col-sm-2 col-lg-1 social"}>
        <Card
          name={"followus"}
          onExpand={this.onExpand}
          expanded={this.isExpanded("followus")}
        >
          <CardHeader
            actAsExpander={true}
            title={"Follow us"}
            i18nKeyTitle={"followus"}
          />
          <CardBody expandable={true} padded={false}>
            <div>
              <a href={""} title={""}>
                Facebook
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                Twitter
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                Instagram
              </a>
            </div>
            <div>
              <a href={""} title={""}>
                GitHub
              </a>
            </div>
          </CardBody>
        </Card>

        {/*<div className={"links-section-header"}>
          <Components.Translation defaultValue="Follow us" i18nKey="followUs"/>
        </div>*/}

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
