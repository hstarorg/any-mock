import { types } from './mutation-types';

export const state = {
  userInfo: {
    userId: 0,
    username: ''
  }
};

export const mutations = {
  [types.SET_USER_INFO](state, userinfo) {
    state.userInfo = userinfo;
  }
};
