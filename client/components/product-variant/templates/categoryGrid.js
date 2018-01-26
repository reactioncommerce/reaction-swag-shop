import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.categoryGrid.helpers({
  component() {
    return Components.Categories;
  }
});
