import { App } from "vue";
import moment from "./moment";
import { createPinia } from "pinia";
import router from "@/router";
import maska from "./maska";

export function registerPlugins(app: App): void {
  app.use(createPinia());
  app.use(router);
  app.use(moment);
  app.use(maska);
}
