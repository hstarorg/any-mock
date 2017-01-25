import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import { authService } from './services';

import { LayoutPage } from './pages/layout';
import { Dashboard } from './pages/home';
import {
  ProjectList, ProjectEdit, ProjectSettings, ProjectGroup,
  ProjectDetail, ProjectApiList, ProjectApiEdit, ProjectApiDetail
} from './pages/project';
import { TeamList } from './pages/team';
import { UserSetting } from './pages/setting';
import { About } from './pages/about';
import { NotFound } from './pages/system';
import Login from './pages/Login';
import Register from './pages/Register';

/* 路由配置 */
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '', component: LayoutPage, meta: { auth: true }, children: [
      { path: '', component: Dashboard },
      { path: 'team', component: TeamList },
      { path: 'project', component: ProjectList },
      { path: 'project/new', component: ProjectEdit },
      { path: 'project/:id/edit', component: ProjectEdit },
      {
        path: 'project/:id', component: ProjectDetail, children: [
          { path: 'settings', component: ProjectSettings },
          { path: 'apis', component: ProjectApiList },
          { path: 'new', component: ProjectApiEdit },
          { path: 'api/:apiId', component: ProjectApiDetail },
          { path: 'api/:apiId/edit', component: ProjectApiEdit }
        ]
      },
      { path: 'settings', component: UserSetting },
      { path: 'about', component: About }
    ]
  },
  { path: '*', component: NotFound }
];

/* 注册路由 */
const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // 如果有路由匹配到了auth属性
  if (to.matched.some(record => record.meta.auth)) {
    authService.validAuth(to, from, next);
  } else {
    next();
  }
});

export default router;
