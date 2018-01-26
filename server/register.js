import { Reaction } from "/server/api";

import ProductDetailPageSimpleLayout from "/imports/plugins/included/product-detail-simple/lib/layout/simple";

function changeProductDetailPageLayout() {
  // Customize default productDetailSimple page's layout
  const customPdpLayout = JSON.parse(JSON.stringify(ProductDetailPageSimpleLayout()));
  customPdpLayout.forEach((item) => {
    if (item.children) {
      for (const child of item.children) {
        if (child.component === "ProductMetadata") {
          child.component = "SimilarProducts";
        }
      }
    }
  });
  Reaction.registerTemplate({
    name: "productDetailSimple",
    title: "Product Detail Simple Layout",
    type: "react",
    templateFor: ["pdp"],
    permissions: ["admin", "owner"],
    audience: ["anonymous", "guest"],
    template: customPdpLayout
  });
}

changeProductDetailPageLayout();
