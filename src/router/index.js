import Vue from 'vue';
import Router from 'vue-router';
import startScreen from '@/layouts/startScreen';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startScreen',
      component: startScreen,
    },
  ],
});
