import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import store from '../store/index';

Vue.use(Router)

const router = new Router({
  routes: [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
  ]
})
// Auth Middleware
router.beforeEach(async (to, from, next) => {
    const {auth: {state}} = store;
    if(state.value.session === null && to.name === 'login') next();
    else if(state.value.session === null && to.meta.requiresAuth) next({name: 'login'});
    else if(state.value.session && to.name === 'login') next({name: 'dashboard'});
    else next();
})
export default router