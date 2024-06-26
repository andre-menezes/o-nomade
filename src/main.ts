import { createApp } from "vue";
import { createPinia } from "pinia";
// import router from "./router";
import App from "./App.vue";
import { useMocksStore } from "./stores/modules/mocks";
import { useAuthStore } from "./stores/modules/auth";
// import { useAppStore } from "./stores/modules/app";

import "./main.css";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import NotFoundLayout from "@/layouts/NotFoundLayout.vue";

import { registerPlugins } from "./plugins";

const app = createApp(App);

app.component("default-layout", DefaultLayout);
app.component("empty-layout", EmptyLayout);
app.component("not-found-layout", NotFoundLayout);

registerPlugins(app);

const authStore = useAuthStore();
authStore.loadAuthFromLocalStorage();

const mockStore = useMocksStore();
mockStore.fetchPagination();

const PAGE = 1;

mockStore.fetchHotelData(PAGE).then(() => {
  app.mount("#app");
});
