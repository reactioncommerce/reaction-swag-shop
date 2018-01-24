import { getComponent, replaceComponent } from "@reactioncommerce/reaction-components";

class ProductTags extends getComponent("ProductTags") {
  get tags() {
    // Returning only those tags that are not "related" tags
    return this.props.tags.filter(tag => {
      return tag.type !== "related";
    });
  }
}

replaceComponent("ProductTags", ProductTags);

export default ProductTags;
