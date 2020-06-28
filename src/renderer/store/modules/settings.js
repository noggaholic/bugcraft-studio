const path = require('path');
const saveSettings = require('./settings/saveSettings');

export default {
  state: {
    alwaysOnTop: false,
    windowTransparency: 100,
    build: 0,
    client: 0,
    configPath: path.resolve(process.cwd(), 'settings.json'),
  },
  getters: {
    getExistingSettings: (state, context, store) => {
      return {
        camera: {
          collision: store.camera.collision,
          spectateSpeed: store.camera.speed,
        },
        environment: {
          timeOfDayEnabled: store.environment.isTimeOfDayEnabled,
        },
        settings: {
          alwaysOnTop: state.alwaysOnTop,
        },
      };
    },
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
  actions: {
    saveSettings(context) {
      const settings = JSON.stringify(context.getters.getExistingSettings);
      saveSettings(context.state.configPath, settings);
    },
  },
};
