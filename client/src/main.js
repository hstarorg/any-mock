import Vue from 'vue';
import axios from 'axios';

window.axios = axios;
import 'lodash';

import Vue2Semantic from './vue2-semantic';
Vue.use(Vue2Semantic);

import App from './App';
import router from './router.config';
import store from './store';

// Vue.transition('fade', {
//   enterClass: 'fadeDown',
//   leaveClass: 'fadeOutDown'
// });

// Vue.transition('zoom', {
//   enterClass: 'zoomIn',
//   leaveClass: 'zoomOut'
// });

// 导入Config
if (process.env.NODE_ENV !== 'production') {
  require('./config/config.dev.js');
} else {
  require('./config/config.prod.js');
}

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
});
