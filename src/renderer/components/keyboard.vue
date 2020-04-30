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
      CameraRotx: firstStep.CameraRot.x,
      CameraRoty: firstStep.CameraRot.y,
      CameraRotz: firstStep.CameraRot.z,
      rotation: firstStep.CameraRot.y,
    };
  
    // Camera.SetCameraView(cinematicValues);
    
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
        CameraRotx: step.CameraRot.x,
        CameraRoty: step.CameraRot.y,
        CameraRotz: step.CameraRot.z,
        rotation:  step.CameraRot.y,
      };
    });

    const cinematicSpeed = Number(speed || 10);
    console.log('# cinematicValues', cinematicValues);

    // gsap.registerPlugin(MotionPathPlugin);
    // tween = gsap.to(cinematicValues, {
    //   duration: cinematicSpeed,
    //   ease: "none",
    //   onComplete: () => {
    //     if (shouldLoop) return playCinematic(cinematicSteps, speed, commit, shouldLoop, Camera);
    //     commit('setMode', 'SPECTATE');
    //     tween = null;
    //   },
    //   onUpdate: () => { 
    //     console.log('# cinematicValues', cinematicValues.rotation);
    //     Camera.SetCameraView(cinematicValues);
    //     },
    //   motionPath: {
    //     path: relativize(cinematicValues, keyframes, "rotation", true),
    //     relative: true
    //   }
    // });
    // tween.play();

    // converts the points into RELATIVE values, optionally making rotational values go in the shortest direction.
    function relativize(start, points, rotationProperty, useRadians) {
      let cur = start;
      let cap = useRadians ? Math.PI * 2 : 360;
      let result = [];
      let p;
      let i;
      let point;
      let rel;
      let dif;
      for (i = 0; i < points.length; i++) {
        point = points[i];
        rel = {};
        for (p in point) {
          rel[p] = point[p];
          if (p === rotationProperty) {
            dif = rel[p] % cap;
            if (dif !== dif % (cap / 2)) {
              rel[p] = dif < 0 ? dif + cap : dif - cap;
            }
          }
        }
        result.push(rel);
        cur = point;
      }
      return result;
    }

    const path = relativize(cinematicValues, keyframes, "rotation", true);
    console.log('# path', path);
    tween = TweenLite.to(cinematicValues, cinematicSpeed, {
      bezier: {
        values: path,
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
        const currentTime = tween.time();
        const totalTime = tween.totalProgress();
        console.log('# currentTime, totalTime', currentTime, totalTime);
        //console.log('# cinematicValues', cinematicValues.rotation);
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
