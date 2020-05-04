
export default {
  state: {
    timeOfDay: { hour: 0, minutes: 0, normalized: 0 },
    isTimeOfDayEnabled: false,
  },
  getters: {
    timeOfDay: state => state.timeOfDay,
    isTimeOfDayEnabled: state => state.isTimeOfDayEnabled,
  },
  mutations: {
    setTimeOfDayStatus(state, isEnabled) {
      const environmentCore = this.getters.core.environment;
      state.isTimeOfDayEnabled = isEnabled;
      if (isEnabled) return environmentCore.enableTimeOfDay();
      return environmentCore.disableTimeOfDay();
    },
    setTimeOfDay(state, TimeOfDay) {
      const environmentCore = this.getters.core.environment;
      state.timeOfDay = TimeOfDay;
      environmentCore.setTimeOfday({ ...TimeOfDay });
    },
  },
};
