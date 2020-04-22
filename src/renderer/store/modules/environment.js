
export default {
  state: {
    timeOfDay: { hour: 0, minutes: 0 },
  },
  getters: {
    timeOfDay: state => state.timeOfDay,
  },
  mutations: {
    setTimeOfDay(state, TimeOfDay) {
      const core = this.getters.core.environment;
      state.timeOfDay = TimeOfDay;
      core.setTimeOfday({ ...TimeOfDay });
    },
  },
};
