import Vue from 'vue'
import App from './App.vue'
import '@kouts/vue-modal/dist/vue-modal.css';

import VueModal from '@kouts/vue-modal';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/router'
import babelPolyfill from 'babel-polyfill';
import {store} from './vuex/store';
import {auth} from './firebase';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('Modal', VueModal);

Vue.config.productionTip = false;

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.state.authorized = true;
    store.dispatch('fetchUserProfile', user)
  }
})