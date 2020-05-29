
export default {
  state: {
    speed: 1,
    mode: 'DISABLED', // ['DISABLED', 'SPECTATE', 'PLAYING']
    cinematicSteps: [],
    cinematicSpeed: 10,
    loopCinematic: false,
    collision: true,
    easing: 'Power0.easeNone',
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
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
    setCurrPosition(state, position) {
      state.position = position;
    },
    setPosition(state, position) {
      state.position = position;
      const core = this.getters.core.camera;
      core.setPosition(position);
    },
    setSpeed(state, speed) {
      const core = this.getters.core.camera;
      state.speed = speed;
      const isSpectateEnabled = state.mode !== 'DISABLED';
      core.setSpeed(Number(speed), isSpectateEnabled);
    },
    setRoll(state, { index, value }) {
      state.cinematicSteps[index].roll = parseFloat(value);
    },
    setCinematicSpeed(state, speed) {
      state.cinematicSpeed = speed;
    },
    setLoopCinematic(state, loop) {
      state.loopCinematic = loop;
    },
    setEasing(state, easing) {
      state.easing = easing;
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
      const store = this;
      addEnvironment(store, camViewMatrix);
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

function addEnvironment(store, cinematic) {
  const isTimeOfDayEnabled = store.getters.isTimeOfDayEnabled;
  if (!isTimeOfDayEnabled) return;
  cinematic.environment = {
    timeOfDay: store.getters.timeOfDay,
  };
}
