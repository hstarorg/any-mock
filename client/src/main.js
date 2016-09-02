import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

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
        component: Welcome
      },
      '/app': {
        name: 'app',
        component: AppList
      },
      '/api': {
        component: Vue.extend({ template: '404' })
      },
      '/app/apis': {
        component: ApiList
      }
    }
  }
});

router.beforeEach(transition => {
  if (transition.to.path !== '/login') {
    if (!localStorage.getItem('token')) {
      transition.abort();
      router.go('/login');
    }
  }
  transition.next();
});

router.start(App, document.querySelector('body > div'));