import Vue from 'vue';
import Router from 'vue-router';

import start from '@/screens/start';
import campground from '@/screens/campground';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: start },
    { path: '/campground', component: campground },
  ],
});
