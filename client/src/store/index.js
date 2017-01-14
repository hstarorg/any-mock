import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { actions } from './actions';
import { getters } from './getters';
import { state, mutations } from './mutations';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // modules: {
  //   test
  // },
  strict: debug,
  plugins: debug ? [] : []
});
