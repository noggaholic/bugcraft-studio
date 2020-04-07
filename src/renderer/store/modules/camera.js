
export default {
  state: {
    speed: 0.73,
    mode: 'DISABLED',
    cinematicSteps: [],
  },
  mutations: {
    setSpeed(state, speed) {
      state.speed = speed;
    },
    addCinematicStep(state, step) {
      state.cinematicSteps.push(step);
    },
    cleanCinematicSteps(state) {
      state.cinematicSteps.splice(0);
    },
    setMode(state, mode) {
      state.mode = mode;
    },
  },
};
