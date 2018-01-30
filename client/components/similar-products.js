import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api/index";
import { Media } from "/lib/collections/index";
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
      const mediaMap = {};
      products.map((product) => {
        const media = Media.find({
          "metadata.productId": product._id
        }, {
          sort: {
            "metadata.priority": 1
          }
        }, { limit: 1 }).fetch();
        if (media && media[0]) {
          mediaMap[product._id] = media[0];
        }
      });
      return (
        <div className="similar-block">
          <div>
            <h3 className="similar-heading">
              <Components.Translation defaultValue="You might also like" i18nKey="productDetail.similar" />
            </h3>
          </div>
          <div className="products-scroll">
            {products.map((product, index) =>
              <Components.ProductGridItems
                {...this.props}
                showFeaturedLabel={false}
                product={product} index={index}
                media={() => this.props.productMedia(index)}
                onClick={(event) => this.handleClick(event, product.handle)}
              />)
            }
          </div>
        </div>
      );
    }
    return null;
  }
}

// Export component if you also want to use it in other places in the App
export default SimilarProducts;
