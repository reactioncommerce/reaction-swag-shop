import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

const methods = {
  "reaction-swag-shop/requestApproachFromStaff": (email) => {
    check(email, String);
    console.log("contact person at " + email);
  }
};

Meteor.methods(methods);
