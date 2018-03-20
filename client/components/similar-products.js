import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api/index";
import { ReactionProduct } from "/lib/api";


class SimilarProducts extends Component {
  static propTypes = {
    productMedia: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.object)
  }

  handleClick = (event, handle) => {
    event.preventDefault();
    ReactionProduct.setProduct(handle);
    // set scrollTop for <html>
    document.children[0].scrollTop = 0;
    Reaction.Router.go("product", { handle });
  }

  render() {
    const { products } = this.props;
    if (products && products.length > 0) {
      const currentTag = ReactionProduct.getTag();
      return (
        <div className="similar-block">
          <div>
            <h3 className="similar-heading">
              <Components.Translation defaultValue="You might also like" i18nKey="productDetail.similar" />
            </h3>
          </div>
          <div className="products-scroll">
            {products.map((product) =>
              <Components.ProductGridItemCustomer
                key={product._id}
                product={product}
                position={(product.positions && product.positions[currentTag]) || {}}
                showFeaturedLabel={false}
              />)}
          </div>
        </div>);
    }
    return null;
  }
}

// Export component if you also want to use it in other places in the App
export default SimilarProducts;
