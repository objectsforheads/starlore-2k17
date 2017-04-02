import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

import start from '@/screens/start';
import campground from '@/screens/campground';

import gameCLI from '@/components/cli';

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    { path: '/', component: start },
    { path: '/campground', component: campground },
  ],
});

Vue.component('game-cli', gameCLI);
