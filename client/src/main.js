import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import App from './App';

import Layout from './pages/Layout'
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AppList from './pages/AppList';

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
        component: AppList
      },
      '/api': {
        component: Vue.extend({ template: '404' })
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

router.start(App, document.body);