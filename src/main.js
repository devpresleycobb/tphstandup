import Vue from 'vue';
import './plugins/compositionapi';
import vuetify from './plugins/vuetify';
import './assets/css/styles.css';
import router from './router';
import App from './App.vue';
import store from './store'
Vue.config.productionTip = false;

(async (auth) => {
  const {state, methods} = auth;
  const poolData = state.value.poolData;
  const pool = await methods.getUserPool(poolData);
  const user = await methods.getCurrentUser(pool);
  if(user) {
    const session = await methods.getSession(user);
    methods.setSession(session);
  }
  new Vue({
    vuetify,
    router,
    render: h => h(App),
  }).$mount('#app')
}
)(store.auth)
