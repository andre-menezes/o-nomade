import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import { useMocksStore } from "./stores/modules/mocks";
import { useAuthStore } from "./stores/modules/auth/authStore";

import "./main.css";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import NotFoundLayout from "@/layouts/NotFoundLayout.vue";

import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
const pinia = createPinia();

app.component("default-layout", DefaultLayout);
app.component("empty-layout", EmptyLayout);
app.component("not-found-layout", NotFoundLayout);

app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.loadAuthFromLocalStorage();

const mockStore = useMocksStore();
mockStore.fetchPagination();
mockStore.fetchHotelData(1).then(() => {
  app.mount("#app");
});
