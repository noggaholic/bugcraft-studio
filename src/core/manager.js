/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks */
const createCamera = require('./logic/camera.js');
const createGetCametaPtr = require('./domain/getCameraPtr');
const createGetEnvPtr = require('./domain/environment/getEnvPtr');
const createEnableTimeOfDay = require('./domain/environment/enableTimeOfDay');
const createDisableTimeOfDay = require('./domain/environment/disableTimeOfDay');
const createGetNormalizedTimeOfDay = require('./domain/environment/getNormalizedTimeOfDay');
const createSetTimeOfday = require('./domain/environment/setTimeOfday');
const createSetNormalizedTimeOfDay = require('./domain/environment/setNormalizedTimeOfDay');
const createEnableSpectate = require('./domain/enableSpectate');
const createDisableSpectate = require('./domain/disableSpectate');
const createEnableViewMatrixUpdate = require('./domain/enableViewMatrixUpdate');
const createDisableViewMatrixUpdate = require('./domain/disableViewMatrixUpdate');
const createGetCameraData = require('./domain/getCameraData');
const createEnableKeyboardControls = require('./domain/enableKeyboardControls');
const createSetPosition = require('./domain/setPosition');
const createSetCameraView = require('./domain/setCameraView');
const createSetCollision = require('./domain/setCollision');
const createSetSpeed = require('./domain/setSpeed');

module.exports = (process, Module, Memory, window, Offsets) => {
  const Game = Offsets.getVersion(Memory);
  if (!Game) {
    throw new Error('Unsupported game version :|');
  }

  console.log('# Game detected', Game);

  const EnableViewMatrixUpdate = createEnableViewMatrixUpdate(Game, Memory, Offsets);
  const DisableViewMatrixUpdate = createDisableViewMatrixUpdate(Game, Memory, Offsets);
  const GetCametaPtr = createGetCametaPtr(Game, Memory, Module, Offsets);
  const GetCameraData = createGetCameraData(Offsets, Game, Memory);
  const SetPosition = createSetPosition(Game, Memory);
  const EnableSpectate = createEnableSpectate(Game, Memory, Offsets, Module, GetCameraData, SetPosition);
  const DisableSpectate = createDisableSpectate(Game, Memory, Offsets, Module);
  const SetCollision = createSetCollision(Game, Memory, Offsets);
  const SetSpeed = createSetSpeed(Game, Memory, Offsets);
  const EnableKeyboardControls = createEnableKeyboardControls(
    Game,
    EnableSpectate,
    EnableViewMatrixUpdate,
    GetCameraData,
    SetPosition,
    SetSpeed,
    Offsets,
    Memory,
  );
  const SetCameraView = createSetCameraView(Game, Memory, Offsets, SetPosition);

  const camera = createCamera(
    GetCametaPtr,
    DisableSpectate,
    EnableViewMatrixUpdate,
    DisableViewMatrixUpdate,
    GetCameraData,
    EnableKeyboardControls,
    SetPosition,
    SetCameraView,
    SetCollision,
  )(Offsets, Game, Memory);

  const EnableTimeOfDay = createEnableTimeOfDay(Game, Memory, Offsets);
  const DisableTimeOfDay = createDisableTimeOfDay(Game, Memory, Offsets);
  const GetNormalizedTimeOfDay = createGetNormalizedTimeOfDay(Game);
  const setTimeOfday = createSetTimeOfday(Memory, GetNormalizedTimeOfDay);
  const setNormalizedTimeOfDay = createSetNormalizedTimeOfDay(Memory);
  const environmentStruct = createGetEnvPtr(Game, Memory, Module, Offsets)();
  const environment = {
    setTimeOfday: (timeOfDay) => setTimeOfday(environmentStruct, timeOfDay),
    setNormalizedTimeOfDay: (timeOfDay) => setNormalizedTimeOfDay(environmentStruct, timeOfDay),
    GetNormalizedTimeOfDay,
    enableTimeOfDay: () => EnableTimeOfDay(environmentStruct),
    disableTimeOfDay: () => DisableTimeOfDay(environmentStruct),
  };
  return {
    Game,
    Memory,
    Offsets,
    camera,
    environment,
  };
};
