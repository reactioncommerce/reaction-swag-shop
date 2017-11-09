import { Hooks, Logger } from "/server/api";
import methods from "./methods";


/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("beforeCoreInit", () => {
  methods.loadShops();
  methods.loadProducts();
  methods.loadTags();
  methods.loadShipping();
  methods.enableShipping();
  methods.enablePayment();
  methods.importProductImages();
  Logger.info("Finished loading Demo data");
});
