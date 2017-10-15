import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isTutorial: false,
    isViewingSky: true,
    canNavigateSky: false,
    isNavigatingSky: false,
    squirrelQuest: true,
    squirrelDebt: false,
    squirrelDebtCounter: 1,
    totalConstellations: 0,
    foundConstellations: {},
    foundConstellationsCount: 0,
    handbookOpen: true,
    activeConstellation: null,
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
    counterIncrement(state, payload) {
      const currentState = state;
      currentState[payload.qualifier] += payload.increment;
    },
    countConstellations(state, payload) {
      const currentState = state;
      currentState.totalConstellations += 1;
      if (typeof currentState.foundConstellations[payload.name] === 'undefined') {
        currentState.foundConstellations[payload.name] = false;
      }
    },
    findConstellation(state, payload) {
      const currentState = state;
      currentState.foundConstellations[payload.name] = true;
      currentState.foundConstellationsCount += 1;
    },
    setActiveConstellation(state, payload) {
      const currentState = state;
      currentState.activeConstellation = payload.name;
    },
  },
});
