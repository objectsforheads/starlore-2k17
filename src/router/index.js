import Vue from 'vue';
import Router from 'vue-router';
import start from '@/screens/start';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start,
    },
  ],
});
