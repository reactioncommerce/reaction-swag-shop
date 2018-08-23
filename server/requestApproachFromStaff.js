import Logger from "@reactioncommerce/logger";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

const methods = {
  "reaction-swag-shop/requestApproachFromStaff": (email) => {
    check(email, String);

    Logger.info(`Contact person at ${email}`);
  }
};

Meteor.methods(methods);
