import { types } from './mutation-types';

export const state = {
  logged: false,
  token: '',
  userInfo: {
    userId: 0,
    username: ''
  }
};

export const mutations = {
  [types.SET_USER](state, userinfo) {
    state.logged = true;
    state.userInfo = userinfo;
  }
};
