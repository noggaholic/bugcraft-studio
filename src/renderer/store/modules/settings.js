
export default {
  state: {
    alwaysOnTop: false,
    windowTransparency: 100,
    build: 0,
    client: 0,
  },
  mutations: {
    setGameInfo(state, { build, client }) {
      console.log('# setGameInfo', build, client);
      state.build = build;
      state.client = client;
    },
    setAlwaysOnTop(state, value) {
      state.alwaysOnTop = value;
    },
    setWindowTransparency(state, value) {
      state.windowTransparency = value;
    },
  },
};
