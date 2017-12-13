import { replaceComponent, getHOCs } from "@reactioncommerce/reaction-components";
import CartIcon from "../components/cartIcon";

replaceComponent("CartIcon", CartIcon, getHOCs("CartIcon"));
