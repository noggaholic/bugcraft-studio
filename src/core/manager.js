/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks */
const createCamera = require('./logic/camera.js');
const createGetCametaPtr = require('./domain/getCameraPtr');
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

  const EnableViewMatrixUpdate = createEnableViewMatrixUpdate(Game, Memory, Offsets);
  const DisableViewMatrixUpdate = createDisableViewMatrixUpdate(Game, Memory, Offsets);
  const GetCametaPtr = createGetCametaPtr(Game, Memory, Module, Offsets);
  const GetCameraData = createGetCameraData(Memory);
  const EnableSpectate = createEnableSpectate(Game, Memory, Offsets, GetCameraData);
  const DisableSpectate = createDisableSpectate(Game, Memory, Offsets, EnableViewMatrixUpdate);
  const SetPosition = createSetPosition(Memory);
  const SetCollision = createSetCollision(Game, Memory, Offsets);
  const SetSpeed = createSetSpeed(Game, Memory, Offsets);
  const EnableKeyboardControls = createEnableKeyboardControls(
    Game,
    EnableSpectate,
    EnableViewMatrixUpdate,
    GetCameraData,
    SetPosition,
    SetSpeed
  );
  const SetCameraView = createSetCameraView(Memory, SetPosition);

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
  )();
  return {
    camera,
  };
};
