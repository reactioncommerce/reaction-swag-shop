import later from "later";
import { Job } from "meteor/vsivsi:job-collection";
import { Jobs } from "/lib/collections";
import { Hooks, Logger } from "/server/api";
import methods from "../methods";

Hooks.Events.add("afterCoreInit", () => {
  Logger.info("Adding swagshop/resetDemoData to JobControl.");
  new Job(Jobs, "swagshop/resetDemoData", {})
    .priority("normal")
    .retry({
      retries: 5,
      wait: 60000,
      backoff: "exponential" // delay by twice as long for each subsequent retry
    })
    .repeat({
      schedule: later.parse.text("every 55 minutes")
    })
    .save({
      // Cancel any jobs of the same type,
      // but only if this job repeats forever.
      cancelRepeats: true
    });
});


export default function () {
  const resetDemoData = Jobs.processJobs("swagshop/resetDemoData", {
    pollInterval: 60 * 60 * 1000, // backup polling, see observer below
    workTimeout: 180 * 1000
  }, (job, callback) => {
    Logger.info("resetting demo data");
    methods.resetData();
    callback();
  });

  Jobs.find({
    type: "swagshop/resetDemoData",
    status: "ready"
  }).observe({
    added() {
      return resetDemoData.trigger();
    }
  });
}
