
export default {
  state: {
    speed: 0,
    cinematicSteps: [],
  },
  mutations: {
    SET_SPEED(speed) {
      this.state.speed = speed;
    },
    addCinematicStep(state, step) {
      state.cinematicSteps.push(step);
    },
    cleanCinematicSteps(state) {
      state.cinematicSteps.splice(0);
    },
  },
};
