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
      path: '/spectate',
      component: require('@/components/home'),
      children: [
        { path: '', component: require('@/components/sections/spectate') },
        { path: 'cinematicBuilder', component: require('@/components/sections/cinematicBuilder') },
      ],
    },
  ],
});
