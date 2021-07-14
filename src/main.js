import Vue from 'vue';
import './plugins/compositionapi';
import vuetify from './plugins/vuetify';
import './assets/css/styles.css';
import router from './router';
import App from './App.vue';
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
