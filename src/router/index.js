import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

import start from '@/screens/start';
import campground from '@/screens/campground';

import gameCLI from '@/components/cli';

import planisphere from '@/components/planisphere';
import constellation from '@/components/constellation';
import constellationPath from '@/components/constellation-path';
import handbook from '@/components/handbook';

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    { path: '/', component: start },
    { path: '/campground', component: campground },
  ],
});

Vue.component('game-cli', gameCLI);
Vue.component('planisphere', planisphere);
Vue.component('constellation', constellation);
Vue.component('constellation-path', constellationPath);
Vue.component('handbook', handbook);
