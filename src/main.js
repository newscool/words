import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import vueMoment from "vue-moment";

Vue.config.productionTip = false;

moment.locale("ko");
Vue.use(vueMoment, { moment });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
