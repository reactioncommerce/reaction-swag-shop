import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Logger } from "/server/api";


const methods = {
  "reaction-swag-shop/requestApproachFromStaff": (email) => {
    check(email, String);

    Logger.info("contact person at " + email);
  }
};

Meteor.methods(methods);
