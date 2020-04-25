
export default {
  state: {
    timeline: null,
    scene: null,
  },
  mutations: {
    setTimeline(state, timeline) {
      state.timeline = timeline;
    },
    setScene(state, scene) {
      state.scene = scene;
    },
  },
};
