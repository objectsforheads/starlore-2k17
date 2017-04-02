import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isTutorial: true,
  },
  mutations: {
    booleanToggle(state, payload) {
      const currentState = state;
      if (typeof payload.boolean === 'boolean') {
        currentState[payload.qualifier] = payload.boolean;
      } else {
        currentState[payload.qualifier] = !currentState[payload.qualifier];
      }
    },
  },
});
