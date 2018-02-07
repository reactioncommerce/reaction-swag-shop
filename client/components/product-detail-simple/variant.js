import React from "react";
import { Components, getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
import {  Media } from "/lib/collections";
import classnames from "classnames";

class Variant extends getRawComponent("Variant") {
  render() {
    const variant = this.props.variant;
    const src = Media.find({
      "metadata.variantId": variant._id
    }, {
      sort: {
        "metadata.priority": 1
      }
    }).fetch();
    const classes = classnames({
      "variant-detail": true,
      "variant-button": true,
      "variant-detail-selected": this.props.isSelected,
      "variant-deleted": this.props.variant.isDeleted,
      "variant-notVisible": !this.props.variant.isVisible
    });

    const variantElement = (
      <li
        className="variant-list-item"
        id="variant-list-item-{variant._id}"
        key={variant._id}
        onClick={this.handleClick}
      >
        <div className={classes}>
          <Components.MediaItem
            editable={false}
            source={src[0]}
            mediaHeight={100}
            mediaWidth={100}
          />
        </div>

        <div className="alerts">
          {this.renderDeletionStatus()}
          {this.renderInventoryStatus()}
          {this.renderValidationButton()}
          {this.props.editButton}
        </div>
      </li>
    );

    if (this.props.editable) {
      return this.props.connectDragSource(this.props.connectDropTarget(variantElement));
    }

    return variantElement;
  }
}

replaceComponent("Variant", Variant);

export default Variant;
