<template>
</template>

<script>

  const robot = require('robot-js');
  const Keyboard = robot.Keyboard;
  const Mouse = robot.Mouse;
  let tween;  
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

  function playCinematic(cinematicSteps, speed, commit, shouldLoop, Camera) {
    if (cinematicSteps.length === 0) return commit('setMode', 'SPECTATE');
    const firstStep = cinematicSteps[0];
    const cinematicValues = {
      x: firstStep.position.x,
      y: firstStep.position.y,
      z: firstStep.position.z,
      viewMatrix00: firstStep.viewMatrix[0][0],
      viewMatrix01: firstStep.viewMatrix[0][1],
      viewMatrix02: firstStep.viewMatrix[0][2],
      viewMatrix10: firstStep.viewMatrix[1][0],
      viewMatrix11: firstStep.viewMatrix[1][1],
      viewMatrix12: firstStep.viewMatrix[1][2],
      viewMatrix20: firstStep.viewMatrix[2][0],
      viewMatrix21: firstStep.viewMatrix[2][1],
      viewMatrix22: firstStep.viewMatrix[2][2],
    };

    const keyframes = cinematicSteps.map((step) => {
      return {
        x: step.position.x,
        y: step.position.y,
        z: step.position.z,
        viewMatrix00: step.viewMatrix[0][0],
        viewMatrix01: step.viewMatrix[0][1],
        viewMatrix02: step.viewMatrix[0][2],
        viewMatrix10: step.viewMatrix[1][0],
        viewMatrix11: step.viewMatrix[1][1],
        viewMatrix12: step.viewMatrix[1][2],
        viewMatrix20: step.viewMatrix[2][0],
        viewMatrix21: step.viewMatrix[2][1],
        viewMatrix22: step.viewMatrix[2][2],
      };
    });

    const cinematicSpeed = Number(speed || 10);
    tween = TweenLite.to(cinematicValues, cinematicSpeed, {
      bezier: {
        values: keyframes,
        curviness: 0,
        type: 'soft',
        timeResolution: 0,
      },
      ease: {
        base: 'easeNone',
        sub: 'easeNone',
        configurable: null,
      },
      onComplete: () => {
        if (shouldLoop) return playCinematic(cinematicSteps, speed, commit, shouldLoop, Camera);
        commit('setMode', 'SPECTATE');
        tween = null;
      },
      onUpdate: () => Camera.setCameraView(cinematicValues)
    });
  };

  function shouldPlayCinematic(newMode, oldMode) {
    return newMode === 'PLAYING' || (newMode === 'SPECTATE' && oldMode === 'SPECTATE');
  }

  function stopCinematic(store) {
    tween.kill();
    tween = undefined;
  }

  export default {
    name: 'keyboard',
    data() {
      return {
        
      };
    },
    mounted() {
      const store = this.$store;
      function step(timestamp) {
        if (robot.Window.getActive().getTitle() !== 'World of Warcraft') {
          window.requestAnimationFrame(step);
          return;
        }
        if (pressingKey(robot.KEY_F3)) {
          if (tween) stopCinematic(store);
          store.dispatch('toggleSpectate');
        }
        if (pressingKey(robot.KEY_F4)) store.dispatch('addWaypoint');
        if (pressingKey(robot.KEY_F5)) {
          if (store.getters.mode === 'SPECTATE') store.dispatch('playCinematic');
          if (store.getters.mode === 'PLAYING' && tween) {
            stopCinematic(store);
            store.commit('setMode', 'SPECTATE');
          }
        }
        if (pressingKey(robot.KEY_F6)) store.dispatch('cleanWaypoints');
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
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
            const { camera: Camera } = this.$store.getters.core;
            const speed = this.$store.getters.cinematicSpeed;
            const { commit } = this.$store;
            const shouldLoop = this.$store.state.camera.loopCinematic;
            return playCinematic(steps, speed, commit, shouldLoop, Camera);
          }
        },
        deep: true
      }
    },
  };
</script>

<style>
</style>
