import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { state, mutations } from './mutations';

Vue.use(Vuex);

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
})
