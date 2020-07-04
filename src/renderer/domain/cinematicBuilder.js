
/**
 * This is the cinematic struct that evolves through time
 */
function BuildKeyframes(steps) {
  const step = steps[0];
  const cinematicValues = {
    x: step.position.x,
    y: step.position.y,
    z: step.position.z,
    yawCos: Math.cos(step.yaw),
    yawSin: Math.sin(step.yaw),
    pitch: step.pitch,
    roll: step.roll,
  };
  const keyframes = steps.map((step) => {
    return {
      x: step.position.x,
      y: step.position.y,
      z: step.position.z,
      yawCos: Math.cos(step.yaw),
      yawSin: Math.sin(step.yaw),
      pitch: step.pitch,
      roll: step.roll,
      ...step,
    };
  });

  return {
    cinematicValues,
    keyframes,
  };
}

/**
 * Set camera position and viewmatrix
 */
function createSetView(Store) {
  const { camera: Camera } = Store.getters.core;
  return cinematicValues => {
    const yawToAngle = Math.atan2(cinematicValues.yawSin, cinematicValues.yawCos);
    cinematicValues.yaw = yawToAngle;
    Camera.SetCameraView(cinematicValues);
  };
}

/**
 * GSAP Options for TweenLite
 */
function createGetCinematicOptions(ApplyEnvironment, Store) {
  const { environment: Environment } = Store.getters.core;
  const { commit: CommitState } = Store;
  const SetView = createSetView(Store);
  return (keyframes, cinematicValues, easing, steps, speed, store, shouldLoop, cinematic) => {
    return {
      bezier: {
        values: keyframes,
        curviness: 0,
        type: 'soft',
        timeResolution: 0,
      },
      ease: easing,
      onComplete: () => {
        if (shouldLoop && cinematic.tween) {
          const CinematicBuilder = createCinematicBuilder(ApplyEnvironment);
          return CinematicBuilder(steps, speed, store, shouldLoop, easing);
        }
        CommitState('setMode', 'SPECTATE');
        cinematic.tween = null;
      },
      onUpdate: () => {
        SetView(cinematicValues);
        if ('timeOfDay' in cinematicValues) Environment.setNormalizedTimeOfDay(cinematicValues.timeOfDay);
      },
    };
  };
}

let cinematic;

function GetCinematicStruct() {
  if (cinematic) return cinematic;
  cinematic = {
    stop: () => {
      cinematic.tween.kill();
      cinematic.tween = undefined;
    },
    tween: {},
  };
  return cinematic;
}

function createCinematicBuilder(ApplyEnvironment) {
  return (steps, speed, Store, shouldLoop, easing = Power0.easeNone) => {
    const { commit } = Store;
    const SetView = createSetView(Store);
    if (steps.length <= 1) return commit('setMode', 'SPECTATE');
    const firstStep = steps[0];
    const { cinematicValues, keyframes } = BuildKeyframes(steps);

    SetView(cinematicValues);

    ApplyEnvironment(cinematicValues, firstStep, keyframes, Store);

    const cinematicSpeed = Number(speed || 10);
    const cinematic = GetCinematicStruct();

    const GetCinematicOptions = createGetCinematicOptions(ApplyEnvironment, Store);
    const cinematicOptions = GetCinematicOptions(keyframes, cinematicValues, easing, steps, speed, Store, shouldLoop, cinematic);
    cinematic.tween = TweenLite.to(
      cinematicValues,
      cinematicSpeed,
      cinematicOptions);

    return cinematic;
  };
}

export default createCinematicBuilder;
