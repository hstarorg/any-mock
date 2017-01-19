import store from './../store';
import { ajax } from './../common';

export const authService = {
  firstEnter: true,
  validAuth(to, from, next) {
    if (store.state.logged) {
      return next();
    }
    let p = Promise.resolve();
    if (this.firstEnter) {
      this.firstEnter = false;
      p = this.autoLogin();
    }
    p.then(() => {
      if (store.state.logged) {
        return next();
      }
      next('/login');
    });
  },
  autoLogin() {
    let token = localStorage.getItem('x-token');
    if (!token) {
      return Promise.resolve();
    }
    return ajax.post(`${AppConf.apiHost}/user/autologin`, null, { headers: { 'x-token': token } })
      .then(user => {
        store.commit('SET_USER', user);
        ajax.setCommonHeader('x-token', token);
      }).catch(() => {
        return Promise.resolve();
      });
  },

  login(user) {
    return ajax.post(`${AppConf.apiHost}/user/login`, user)
      .then(user => {
        localStorage.setItem('x-token', user.token);
        ajax.setCommonHeader('x-token', user.token);
        store.commit('SET_USER', user);
      });
  }
};
