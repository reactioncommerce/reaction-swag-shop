import { Reaction } from "/server/api";

import ProductDetailPageSimpleLayout from "/imports/plugins/included/product-detail-simple/lib/layout/simple";

function changeProductDetailPageLayout() {
  // Customize default productDetailSimple page's layout
  const customPdpLayout = JSON.parse(JSON.stringify(ProductDetailPageSimpleLayout()));
  customPdpLayout.forEach((item) => {
    if (item.children) {
      for (const child of item.children) {
        if (child.component === "ProductTags") {
          child.component = "";
        }
      }
    }
  });
  customPdpLayout.push(
    {
      type: "block",
      columns: 12,
      size: "full",
      permissions: [
        "admin"
      ],
      audience: [
        "guest",
        "anonymous"
      ],
      style: {
        ["@media  only screen and (max-width: 921px)"]: {
          minWidth: "100%",
          maxWidth: "100%"
        }
      },
      children: [
        {
          component: "SimilarProducts"
        }
      ]
    }
  );
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
