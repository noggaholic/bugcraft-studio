import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/home'),
      children: [
        { path: '', component: require('@/components/sections/general') },
      ],
    },
    {
      name: 'error',
      path: '/error',
      component: require('@/components/error'),
    },
    {
      path: '/spectate',
      component: require('@/components/home'),
      children: [
        { path: '', component: require('@/components/sections/spectate') },
        { path: 'cinematicBuilder', component: require('@/components/sections/cinematicBuilder') },
      ],
    },
    {
      path: '/environment',
      component: require('@/components/home'),
      children: [
        { path: '', component: require('@/components/sections/environment') },
      ],
    },
    {
      path: '/settings',
      component: require('@/components/home'),
      children: [
        { path: '', component: require('@/components/sections/settings') },
      ],
    },
  ],
});
