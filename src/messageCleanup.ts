// messageCleanup.ts
import cron from "node-cron";
import { cleanupMessages } from "./database";

export function startMessageCleanup() {
  cron.schedule("0 0 * * *", () => {
    cleanupMessages();
  });
}
