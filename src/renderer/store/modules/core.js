
export default {
  state: {
    core: undefined,
  },
  getters: {
    core: state => state.core,
  },
  mutations: {
    setCore(state, core) {
      state.core = core;
    },
  },
};
