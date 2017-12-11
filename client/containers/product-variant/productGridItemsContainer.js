import { replaceComponent, getHOCs } from "@reactioncommerce/reaction-components";
import ProductGridItems from "../../components/product-variant/productGridItems";

replaceComponent("ProductGridItems", ProductGridItems, getHOCs("ProductGridItems"));