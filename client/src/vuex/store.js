import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 定义状态对象
const state = {
  userInfo: {
    userId: 0,
    username: ''
  }
};

// 定义变更
const mutations = {
  SET_USER(state, userinfo) {
    state.userInfo = userinfo;
  }
};

export default new Vuex.Store({
  state,
  mutations
});