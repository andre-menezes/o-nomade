import { createApp } from "vue";
import App from "./App.vue";
import "./styles/css/main.css";
import "./styles/css/palette.css";
import router from "./router";

const app = createApp(App);

app.use(router).mount("#app");
