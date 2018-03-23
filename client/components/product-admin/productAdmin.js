import React from "react";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import CoreProductAdmin from "/imports/plugins/included/product-admin/client/components/productAdmin";


class ProductAdmin extends CoreProductAdmin {
  render() {
    return (
      <Components.CardGroup>
        <Components.Card
          expanded={this.isExpanded("productDetails")}
          name={"productDetails"}
          onExpand={this.handleCardExpand}
        >
          <Components.CardHeader
            actAsExpander={true}
            i18nKeyTitle="productDetailEdit.productSettings"
            title="Product Settings"
            onChange={this.handleFieldChange}
          />
          <Components.CardBody expandable={true}>
            <Components.Select
              clearable={false}
              i18nKeyLabel="productDetailEdit.template"
              i18nKeyPlaceholder="productDetailEdit.templateSelectPlaceholder"
              label="Template"
              name="template"
              onChange={this.handleSelectChange}
              options={this.props.templates}
              placeholder="Select a template"
              value={this.product.template}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.title"
              i18nKeyPlaceholder="productDetailEdit.title"
              label="Title"
              name="title"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="Title"
              ref="titleInput"
              value={this.product.title}
            />
            <Components.TextField
              helpText={this.permalink}
              i18nKeyLabel="productDetailEdit.permalink"
              i18nKeyPlaceholder="productDetailEdit.permalink"
              label="Permalink"
              name="handle"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="Permalink"
              ref="handleInput"
              value={this.product.handle}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.pageTitle"
              i18nKeyPlaceholder="productDetailEdit.pageTitle"
              label="Subtitle"
              name="pageTitle"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="Subtitle"
              ref="subtitleInput"
              value={this.product.pageTitle}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.vendor"
              i18nKeyPlaceholder="productDetailEdit.vendor"
              label="Vendor"
              name="vendor"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              onReturnKeyDown={this.handleFieldBlur}
              placeholder="Vendor"
              ref="vendorInput"
              value={this.product.vendor}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.description"
              i18nKeyPlaceholder="productDetailEdit.description"
              label="Description"
              multiline={true}
              name="description"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              placeholder="Description"
              ref="descriptionInput"
              value={this.product.description}
            />
            <Components.Select
              clearable={false}
              i18nKeyLabel="productDetailEdit.originCountry"
              i18nKeyPlaceholder="productDetailEdit.originCountry"
              label="Origin Country"
              name="originCountry"
              onChange={this.handleSelectChange}
              placeholder="Select a Country"
              ref="countryOfOriginInput"
              value={this.product.originCountry}
              options={this.props.countries}
            />
            <Components.Divider />
            <div className="row">
              <div className="col-sm-12">
                {/* <Components.Translation defaultValue="My cart" i18nKey="myCart" /> */}
                <Components.TextField
                  i18nKeyLabel="productVariant.featuredProductLabel"
                  i18nKeyPlaceholder=""
                  placeholder=""
                  label="Featured product label"
                  name="featuredProductLabel"
                  ref="featuredProductLabel"
                  value={this.product.featuredProductLabel}
                  onBlur={this.handleFieldBlur}
                  onChange={this.handleFieldChange}
                  onReturnKeyDown={this.handleFieldBlur}
                />
              </div>
            </div>
          </Components.CardBody>
        </Components.Card>
        <Components.Card
          expanded={this.isExpanded("social")}
          name={"social"}
          onExpand={this.handleCardExpand}
        >
          <Components.CardHeader
            actAsExpander={true}
            i18nKeyTitle="social.socialTitle"
            title="Social"
          />
          <Components.CardBody expandable={true}>
            <Components.TextField
              i18nKeyLabel="productDetailEdit.facebookMsg"
              i18nKeyPlaceholder="productDetailEdit.facebookMsg"
              label="Facebook Message"
              multiline={true}
              name="facebookMsg"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              ref="facebookMsgInput"
              value={this.product.facebookMsg}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.twitterMsg"
              i18nKeyPlaceholder="productDetailEdit.twitterMsg"
              label="Twitter Message"
              multiline={true}
              name="twitterMsg"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              ref="twitterMsgInput"
              value={this.product.twitterMsg}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.pinterestMsg"
              i18nKeyPlaceholder="productDetailEdit.pinterestMsg"
              label="Pinterest Message"
              multiline={true}
              name="pinterestMsg"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              ref="pinterestMsgInput"
              value={this.product.pinterestMsg}
            />
            <Components.TextField
              i18nKeyLabel="productDetailEdit.googleplusMsg"
              i18nKeyPlaceholder="productDetailEdit.googleplusMsg"
              label="Google+ Message"
              multiline={true}
              name="googleplusMsg"
              onBlur={this.handleFieldBlur}
              onChange={this.handleFieldChange}
              ref="googleplusMsgInput"
              value={this.product.googleplusMsg}
            />
          </Components.CardBody>
        </Components.Card>

        <Components.Card
          expanded={this.isExpanded("hashtags")}
          name={"hashtags"}
          onExpand={this.handleCardExpand}
        >
          <Components.CardHeader
            actAsExpander={true}
            i18nKeyTitle="productDetail.tags"
            title="Tags"
          />
          <Components.CardBody expandable={true}>
            <Components.TagList
              editable={this.props.editable}
              enableNewTagForm={true}
              product={this.product}
              tagProps={{
                fullWidth: true
              }}
            />
          </Components.CardBody>
        </Components.Card>

        <Components.Card
          expanded={this.isExpanded("metafields")}
          name={"metafields"}
          onExpand={this.handleCardExpand}
        >
          <Components.CardHeader
            actAsExpander={true}
            i18nKeyTitle="productDetailEdit.details"
            title="Details"
          />
          <Components.CardBody expandable={true}>
            <Components.Metadata
              metafields={this.product.metafields}
              newMetafield={this.props.newMetafield}
              onMetaChange={this.handleMetaChange}
              onMetaRemove={this.handleMetaRemove}
              onMetaSave={this.handleMetaSave}
            />
          </Components.CardBody>
        </Components.Card>
      </Components.CardGroup>
    );
  }
}

replaceComponent("ProductAdmin", ProductAdmin);

export default ProductAdmin;
