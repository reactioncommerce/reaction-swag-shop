import { replaceComponent, getHOCs } from "@reactioncommerce/reaction-components";
import NavBar from "../components/navBar";

replaceComponent("NavBar", NavBar, getHOCs("NavBar"));
