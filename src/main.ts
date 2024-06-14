import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import { useMocksStore } from "./stores/modules/mocks";
import { useAuthStore } from "./stores/modules/auth/authStore";

import "./styles/css/main.css";
import "./styles/css/palette.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const mockStore = useMocksStore();
const authStore = useAuthStore();

authStore.loadAuthFromLocalStorage();

mockStore.fetchHotelData().then(() => {
  app.mount("#app");
});
