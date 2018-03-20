import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import { replaceComponent } from "@reactioncommerce/reaction-components";

/**
 * Use a customized version of Icon component, because the stock component does not accept
 * an onClick event handler.
 */
const Icon = ({ className, icon, style, onClick }) => {
  let classes;

  if (icon) {
    if (icon.indexOf("icon-") === 0 || icon.indexOf("fa") >= 0) {
      classes = icon;
    } else {
      classes = classnames({
        fa: true,
        [`fa-${icon}`]: true
      });
    }
  }

  classes = classnames({
    "rui": true,
    "font-icon": true
  }, classes, className);

  return (
    <i style={style} className={classes} onClick={onClick} role={"presentation"}/>
  );
};

Icon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
};

replaceComponent("Icon", Icon);

export default Icon;
