import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import store from "./store";

Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
