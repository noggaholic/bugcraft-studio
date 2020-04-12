
export default {
  state: {
    alwaysOnTop: false,
    windowTransparency: 100,
  },
  mutations: {
    setAlwaysOnTop(state, value) {
      state.alwaysOnTop = value;
    },
    setWindowTransparency(state, value) {
      state.windowTransparency = value;
    },
  },
};
