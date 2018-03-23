import React from "react";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Alert from "sweetalert2";
import { i18next } from "/client/api";
import { Validation } from "@reactioncommerce/reaction-collections";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import { Card, CardHeader, CardBody } from "/imports/plugins/core/ui/client/components";


const EmailFormSchema = new SimpleSchema({
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email
  }
});

class SwagShopFooter extends React.Component {
  constructor(...args) {
    super(...args);
    this.validation = new Validation(EmailFormSchema);
    this.state = {
      email: "",
      expandedCards: ["shop", "company", "followus"],
      validationStatus: this.validation.validationStatus
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  handleChange = (event) => {
    this.setState({
      email: event.currentTarget.value
    });
  }

  handleFieldBlur = (event) => {
    const validationStatus = this.validation.validate({
      email: event.currentTarget.value
    });

    this.setState({
      validationStatus
    });

    if (validationStatus.isValid && event.currentTarget.value) {
      Meteor.call("reaction-swag-shop/requestApproachFromStaff", event.currentTarget.value, (error) => {
        if (!error) {
          Alert({
            title: i18next.t("app.success"),
            text: i18next.t("emailSent"),
            type: "success",
            timer: 3200
          }).catch(() => null);
        }
      });
    }
  }

  get isMobile() {
    const matchQuery = window.matchMedia("(max-width: 768px)");
    return matchQuery.matches;
  }

  onWindowResize = () => {
    if (this.isMobile) {
      this.setState({
        expandedCards: []
      });
    } else {
      this.setState({
        expandedCards: ["shop", "company", "followus"]
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

  isExpanded = (groupName) => this.state.expandedCards.includes(groupName);

  renderEmailForm() {
    return (
      <div className="col-xs-12 col-sm-4 col-lg-6 get-in-contact">
        <div className="email-form">
          <div className="email-form-header">Built on Reaction Commerce</div>
          <div className="email-form-subheader">Feeling inspired?</div>
          <Components.Translation defaultValue="See what you can do with our open source platform." i18nKey="seeWhatYouCanDo"/>
          <div className="email-form-field">
            <Components.TextField
              i18nKeyPlaceholder="emailAddress"
              name="email"
              onBlur={this.handleFieldBlur}
              onChange={this.handleChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="email address"
              ref="emailInput"
              value={this.state.email}
              validation={this.state.validationStatus}
            />
            <div className="field-arrow-right">
              <i className="fa fa-long-arrow-right" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNavigation() {
    return (
      <div className="col-xs-12 col-sm-2 col-sm-offset-2 col-lg-offset-1 col-lg-1 navigation">
        <Card
          name="shop"
          onExpand={this.onExpand}
          expanded={this.isExpanded("shop")}
        >
          <CardHeader
            actAsExpander={this.isMobile}
            title="Shop"
            i18nKeyTitle="shop"
          />
          <CardBody expandable>
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

  renderCompanyLinks() {
    return (
      <div className="col-xs-12 col-sm-2 col-lg-1 company">
        <Card
          name="company"
          onExpand={this.onExpand}
          expanded={this.isExpanded("company")}
        >
          <CardHeader
            actAsExpander={this.isMobile}
            title="Company"
            i18nKeyTitle="company"
          />
          <CardBody expandable>
            <div>
              <a href="https://reactioncommerce.com/about" title="about">
                <Components.Translation defaultValue="About" i18nKey="about"/>
              </a>
            </div>
            <div>
              <a href="https://blog.reactioncommerce.com" title="blog">
                <Components.Translation defaultValue="Blog" i18nKey="blog"/>
              </a>
            </div>
            <div>
              <a href="https://www.reactioncommerce.com/about#contact" title="contact">
                <Components.Translation defaultValue="Contact" i18nKey="contact"/>
              </a>
            </div>
            <div>
              <a href="https://www.reactioncommerce.com/careers" title="careers">
                <Components.Translation defaultValue="Careers" i18nKey="careers"/>
              </a>
            </div>
            <div>
              <a href="https://www.reactioncommerce.com/press" title="press">
                <Components.Translation defaultValue="Press" i18nKey="press"/>
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderSocialLinks() {
    return (
      <div className="col-xs-12 col-sm-2 col-lg-1 social">
        <div className="heading">
          <Components.Translation defaultValue="Follow us" i18nKey="followUs"/>
        </div>
        <div>
          <a href="https://twitter.com/getreaction" title="Twitter">
            <i className="fa fa-twitter" />
            <div className="text">
              Twitter
            </div>
          </a>
        </div>
        <div>
          <a href="https://facebook.com/reactioncommerce" title="Facebook">
            <i className="fa fa-facebook" />
            <div className="text">
              Facebook
            </div>
          </a>
        </div>
        <div>
          <a href="https://instagram.com/reactioncommerce" title="Instagram">
            <i className="fa fa-instagram" />
            <div className="text">
              Instagram
            </div>
          </a>
        </div>
        <div>
          <a href="https://github.com/reactioncommerce/reaction" title="GitHub">
            <i className="fa fa-github" />
            <div className="text">
              GitHub
            </div>
          </a>
        </div>

      </div>
    );
  }

  renderBottomLine() {
    return (
      <div className="bottomline row">
        &copy;{"2017 REACTION COMMERCE, INC. Privacy & Terms"}
      </div>
    );
  }

  render() {
    return (
      <div className="footer container-fluid">
        <div className="footer-main row">
          {this.renderEmailForm()}
          {this.renderNavigation()}
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
