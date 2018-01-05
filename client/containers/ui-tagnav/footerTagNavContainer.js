import { registerComponent, getRawComponent, getHOCs } from "@reactioncommerce/reaction-components";

const tagNavHOCs = getHOCs("TagNav");

const NavbarStates = {
  Orientation: "stateNavbarOrientation",
  Position: "stateNavbarPosition",
  Anchor: "stateNavbarAnchor",
  Visible: "stateNavbarVisible"
};

const NavbarOrientation = {
  Vertical: "vertical",
  Horizontal: "horizontal"
};

const NavbarPosition = {
  Static: "static",
  Fixed: "fixed"
};

const NavbarAnchor = {
  Top: "top",
  Right: "right",
  Bottom: "bottom",
  Left: "left",
  None: "inline"
};

const wrapComponent = (Comp) => {
  const TagNavContainer = tagNavHOCs[1](Comp);
  class FooterTagNavContainer extends TagNavContainer {
    onWindowResize = () => {
      this.setState({
        [NavbarStates.Orientation]: NavbarOrientation.Vertical,
        [NavbarStates.Position]: NavbarPosition.Static,
        [NavbarStates.Anchor]: NavbarAnchor.None,
        [NavbarStates.Visible]: false
      });
    }
  }
  return FooterTagNavContainer;
};

registerComponent("FooterTagNav", getRawComponent("TagNav"), [tagNavHOCs[0], wrapComponent]);
