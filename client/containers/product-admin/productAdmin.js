import { replaceComponent, getHOCs } from "@reactioncommerce/reaction-components";
import ProductAdmin from "../../components/product-admin/productAdmin";

replaceComponent("ProductAdmin", ProductAdmin, getHOCs("ProductAdmin"));
