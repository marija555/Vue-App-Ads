import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import * as fb from "../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(x => x.meta.requiresAuth);
  if(requireAuth && !fb.auth.currentUser) {
    next('/login');
  } else {
    next();
  }
})

export default router;