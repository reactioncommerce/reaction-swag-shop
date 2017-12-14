import { registerComponent, getHOCs } from "@reactioncommerce/reaction-components";
import SwagShopFooter from "../components/footer";

registerComponent("SwagShopFooter", SwagShopFooter, getHOCs("NavBar"));
