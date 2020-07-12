<template>
</template>

<script>
  const robot = require('robot-js');
  const ApplyEnvironment = require('../domain/applyEnvironment');
  const CreateCinematicBuilder = require('../domain/cinematicBuilder');
  const CinematicBuilder = CreateCinematicBuilder.default(ApplyEnvironment.default);
  const Keyboard = robot.Keyboard;
  const Mouse = robot.Mouse;
  
  let currTime = new Date();
  const shouldNotify = () => {
    const now = new Date().getTime();
    if (now > currTime.getTime() + 300) {
      currTime = new Date();
      return true;
    }
  };

  function pressingKey(key) {
    return Keyboard.getState(key) && shouldNotify();
  }

  function shouldPlayCinematic(newMode, oldMode) {
    return newMode === 'PLAYING' || (newMode === 'SPECTATE' && oldMode === 'SPECTATE');
  }
  let cinematic;
  export default {
    name: 'keyboard',
    data() {
      return {
        
      };
    },
    mounted() {
      const store = this.$store;
      setInterval(() => {
        if (robot.Window.getActive().getTitle() !== 'World of Warcraft') return;
        if (pressingKey(robot.KEY_F3)) {
          if (cinematic && cinematic.tween) cinematic.stop();
          store.dispatch('toggleSpectate');
        }
        if (pressingKey(robot.KEY_F4)) store.dispatch('addWaypoint');
        if (pressingKey(robot.KEY_F5)) {
          if (store.getters.mode === 'SPECTATE') store.dispatch('playCinematic');
          if (store.getters.mode === 'PLAYING' && (cinematic && cinematic.tween)) {
            cinematic.stop();
            store.commit('setMode', 'SPECTATE');
          }
        }
        if (pressingKey(robot.KEY_F6)) store.dispatch('cleanWaypoints');
      }, 20);
    },
    computed: {
      mode() { return this.$store.state.camera.mode; }
    },
    watch: {
      mode: {
        handler (newMode, previousMode) {
          if (shouldPlayCinematic(newMode, previousMode)) {
            this.$store.dispatch('playCinematic');
            const steps = this.$store.getters.steps;
            const speed = this.$store.getters.cinematicSpeed;
            const shouldLoop = this.$store.state.camera.loopCinematic;
            const store = this.$store;
            const easing = `${this.$store.state.camera.easing}.${this.$store.state.camera.easingTypeSelected}`;
            cinematic = CinematicBuilder(steps, speed, store, shouldLoop, easing);
          }
        },
        deep: true
      }
    },
  };
</script>

<style scoped>
</style>
