import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.transition('flipOutY', {
  enterClass: 'fadeInRightBig',
  leaveClass: 'fadeOutLeftBig'
});

import 'lodash';

import { config } from './config';
window.AppConf = config;

import App from './App';

import Layout from './pages/Layout'
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AppList from './pages/AppList';
import ApiList from './pages/ApiList';

let router = new VueRouter({
  saveScrollPosition: true,
  history: true
});

router.map({
  '/login': {
    component: Login
  },
  '/': {
    component: Layout,
    subRoutes: {
      '/': {
        component: Welcome,
        auth: true
      },
      '/app': {
        name: 'app',
        component: AppList,
        auth: true
      },
      '/api': {
        component: Vue.extend({ template: '404' }),
        auth: true
      },
      '/app/apis': {
        component: ApiList,
        auth: true
      }
    }
  }
});

router.beforeEach(transition => {
  if (transition.to.auth) {
    if (!localStorage.getItem('token') || localStorage.getItem('logout')) {
      localStorage.removeItem('token');
      localStorage.removeItem('logout');
      transition.abort();
      router.go('/login');
    }
  }
  transition.next();
});

Vue.$router = router;

router.start(App, document.querySelector('body > div'));