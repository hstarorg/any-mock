import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import LayoutPage from './pages/layout/LayoutPage';
// import Login from './pages/Login';
import Welcome from './pages/Welcome';
// import AppList from './pages/AppList';
// import ApiList from './pages/ApiList';
// import Search from './pages/Search';
// import Register from './pages/Register';

/* 路由配置 */
const routes = [
  // { path: '/login', component: Login },
  // { path: '/register', component: Register },
  {
    path: '', component: LayoutPage, children: [
      { path: '', component: Welcome },
      // { path: 'app', component: AppList },
      // { path: 'app/apis', component: ApiList }
    ]
  },
  { path: '*', component: {} }
];

/* 注册路由 */
const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // 如果有路由匹配到了auth属性
  if (to.matched.some(record => record.meta.auth)) {
    // todo 此处应该做登录
    next();
  } else {
    next();
  }
});

export default router;
