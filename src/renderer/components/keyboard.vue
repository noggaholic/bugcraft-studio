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
      yawCos: Math.cos(firstStep.yaw),
      yawSin: Math.sin(firstStep.yaw),
      pitch: firstStep.pitch,
      roll: firstStep.roll,
    };
    
    const keyframes = cinematicSteps.map((step) => {
      return {
        x: step.position.x,
        y: step.position.y,
        z: step.position.z,
        yawCos: Math.cos(step.yaw),
        yawSin: Math.sin(step.yaw),
        pitch: step.pitch,
        roll: step.roll,
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
      onUpdate: () => {
        const yawToAngle = Math.atan2(cinematicValues.yawSin, cinematicValues.yawCos);
        cinematicValues.yaw = yawToAngle;
        Camera.SetCameraView(cinematicValues);
      }
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
      setInterval(() => {
        if (robot.Window.getActive().getTitle() !== 'World of Warcraft') return;
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
