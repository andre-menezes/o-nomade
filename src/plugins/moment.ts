import { App } from "vue";
import moment from "moment";

export default {
  install(app: App) {
    moment.locale("pt-br");
    app.config.globalProperties.$moment = moment;
  },
};
