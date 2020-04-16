
export default {
  state: {
    speed: 10,
    mode: 'DISABLED', // ['DISABLED', 'SPECTATE', 'PLAYING']
    cinematicSteps: [],
    cinematicSpeed: 10,
    loopCinematic: false,
    collision: true,
  },
  getters: {
    isSpectateEnabled: state => {
      const mode = state.mode;
      return mode === 'SPECTATE' || mode === 'PLAYING';
    },
    isCinematicModeEnabled: state => {
      const mode = state.mode;
      return mode === 'PLAYING';
    },
    steps: (state) => state.cinematicSteps,
    speed: (state) => state.speed,
    cinematicSpeed: (state) => state.cinematicSpeed,
    mode: (state) => state.mode,
  },
  mutations: {
    setSpeed(state, speed) {
      const core = this.getters.core.camera;
      state.speed = speed;
      core.setSpeed(Number(speed));
    },
    setCinematicSpeed(state, speed) {
      state.cinematicSpeed = speed;
    },
    setLoopCinematic(state, loop) {
      state.loopCinematic = loop;
    },
    addCinematicStep(state, step) {
      state.cinematicSteps.push(step);
    },
    cleanCinematicSteps(state) {
      state.cinematicSteps.splice(0);
    },
    setCollision(state, enabled) {
      state.collision = enabled;
      const { camera: Camera } = this.getters.core;
      Camera.SetCollision(state.collision);
    },
    setMode(state, mode) {
      const previousMode = state.mode;
      state.mode = mode;
      const { camera: Camera } = this.getters.core;
      if (mode === 'DISABLED') return Camera.disableSpectator();
      if (mode === 'SPECTATE') return Camera.enableSpectator();
      if (mode === 'PLAYING' && previousMode === 'SPECTATE') {
        Camera.disableSpectatorMode();
        return Camera.disableViewMatrixUpdate();
      }
    },
  },
  actions: {
    toggleSpectate(context) {
      if (context.state.mode === 'DISABLED') return context.commit('setMode', 'SPECTATE');
      context.commit('setMode', 'DISABLED');
    },
    enableSpectate() {},
    addWaypoint(context) {
      const core = this.getters.core.camera;
      const camViewMatrix = core.getView();
      context.commit('addCinematicStep', camViewMatrix);
    },
    cleanWaypoints(context) {
      context.commit('cleanCinematicSteps');
    },
    playCinematic(context) {
      context.commit('setMode', 'PLAYING');
    },
    disableSpectate() {},
  },
};
