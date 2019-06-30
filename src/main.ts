import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'echarts';
import Echarts from 'vue-echarts/components/ECharts.vue';

Vue.config.productionTip = false;

Vue.component('v-chart', Echarts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


