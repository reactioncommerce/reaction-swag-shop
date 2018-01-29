import { Reaction } from "/server/api";

function changeProductDetailPageLayout() {
  // Customize default productDetailSimple page's layout
  const customPdpLayout = require("../private/data/productDetailSimple");
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
