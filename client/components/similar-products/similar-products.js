import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Media } from "/lib/collections";
// import ProductsGallery from "./products-gallery";

// Create your component
class SimilarProducts extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
  }

  handleClick = (event) => {
    const handle = event.currentTarget.dataset.id;
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
              <Components.Translation defaultValue="You may also like" i18nKey="productDetail.similar" />
            </h3>
          </div>
          <div className="products-scroll">
            {products.map((product) =>
              <div className="similar-product" key={product._id} data-id={product.handle} onClick={this.handleClick}>
                <Components.MediaItem
                  source={mediaMap[product._id]}
                />
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

// Export component if you also want to use it in other places in the App
export default SimilarProducts;
