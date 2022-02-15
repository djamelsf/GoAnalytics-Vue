import Vue from 'vue'
import App from './App.vue'
import { store } from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './custom.scss'
import VueApexCharts from "vue-apexcharts";
import JwPagination from 'jw-vue-pagination'
import router from './router'

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('jw-pagination', JwPagination);




new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
