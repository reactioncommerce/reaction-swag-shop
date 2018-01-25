import { getComponent, replaceComponent } from "@reactioncommerce/reaction-components";

class ProductTags extends getComponent("ProductTags") {
  get tags() {
    const tags = this.props.tags;
    if (tags && Array.isArray(tags)) {
      // Returning only those tags that are not "related" tags
      return tags.filter(tag => {
        return tag.type !== "related";
      });
    }
    return tags;
  }
}

replaceComponent("ProductTags", ProductTags);

export default ProductTags;
