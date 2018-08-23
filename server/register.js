import Reaction from "/imports/plugins/core/core/server/Reaction";

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
