import { Hooks, Logger } from "/server/api";
import "./i18n";
import methods from "./methods";

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("beforeCoreInit", () => {
  methods.loadShops();
  Logger.info("Finished loading Shop data");
});

Hooks.Events.add("afterCoreInit", () => {
  methods.initLayout();
  methods.loadProducts();
  methods.importProductImages();
  methods.publishProducts();
  methods.loadTags();
  methods.loadShipping();
  methods.enableShipping();
  methods.enablePayment();
  methods.setupRoutes();
  Logger.info("Finished loading the rest of the Demo data");
});
