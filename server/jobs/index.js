import "./jobs/exchangerates";
import "./jobs/cleanup";
import "./jobs/cart";
import cleanupJob from "./jobs/cleanup";
import fetchRateJobs from "./jobs/exchangerates";
import cartCleanupJob from "./jobs/cart";

cleanupJob();
fetchRateJobs();
cartCleanupJob();
