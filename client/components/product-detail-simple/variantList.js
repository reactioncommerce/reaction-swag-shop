import React from "react";
import { Components, getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";

class VariantList extends getRawComponent("VariantList") {
  renderChildVariants() {
    let childVariants = [];

    if (this.props.childVariants) {
      childVariants = this.props.childVariants.map((childVariant, index) => {
        const media = this.props.childVariantMedia.filter((mediaItem) => {
          if (mediaItem.metadata.variantId === childVariant._id) {
            return true;
          }
          return false;
        });

        return (
          <Components.EditContainer
            data={childVariant}
            disabled={this.props.editable === false}
            editView="variantForm"
            i18nKeyLabel="productDetailEdit.editVariant"
            key={index}
            label="Edit Variant"
            onEditButtonClick={this.handleChildVariantEditClick}
            onVisibilityButtonClick={this.handleVariantVisibilityClick}
            permissions={["createProduct"]}
            showsVisibilityButton={true}
          >
            <Components.ChildVariant
              isSelected={this.props.variantIsSelected(childVariant._id)}
              media={media}
              onClick={this.handleChildVariantClick}
              variant={childVariant}
            />
          </Components.EditContainer>
        );
      });
    }

    if (childVariants.length) {
      return [
        <Components.Divider
          key="availableOptionsDivider"
          i18nKeyLabel="availableOptions"
          label="Available Options"
        />,
        <div className="row variant-product-options" key="childVariantList">
          {childVariants}
        </div>
      ];
    }

    return null;
  }
}

replaceComponent("VariantList", VariantList);
