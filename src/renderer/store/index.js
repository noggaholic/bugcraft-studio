import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import VTooltip from 'v-tooltip';

Vue.use(Vuex);
Vue.use(VTooltip);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
});
