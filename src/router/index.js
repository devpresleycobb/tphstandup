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
    const {auth: {state, methods}} = store;
    if (state.value.session === null && to.name !== 'login') {
        const poolData = state.value.poolData;
        const pool = await methods.getUserPool(poolData);
        const user = await methods.getCurrentUser(pool);
        if(!user) {
            next({ name: 'login' });
        } else {
            const session = await methods.getSession(user);
            console.log('session', session);
            methods.setSession(session);
            next({name: 'dashboard'});
        }
    }
    next();
})
export default router