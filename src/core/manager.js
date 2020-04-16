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

module.exports = (process, module, Memory, window, Offsets) => {

  const Game = Offsets.getVersion(Memory);
  if (!Game) {
    throw new Error('Unsupported game version :|');
  }

  const EnableViewMatrixUpdate = createEnableViewMatrixUpdate(Game, Memory, Offsets);
  const DisableViewMatrixUpdate = createDisableViewMatrixUpdate(Game, Memory, Offsets);
  const GetCametaPtr = createGetCametaPtr(Game, Memory, Offsets);
  const EnableSpectate = createEnableSpectate(Game, Memory, Offsets);
  const DisableSpectate = createDisableSpectate(Game, Memory, Offsets, EnableViewMatrixUpdate);
  const GetCameraData = createGetCameraData(Memory);
  const SetPosition = createSetPosition(Memory);
  const EnableKeyboardControls = createEnableKeyboardControls(
    Game,
    EnableSpectate,
    EnableViewMatrixUpdate,
    GetCameraData,
    SetPosition,
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
  )(Game, Memory, Offsets);
  return {
    camera,
  };
};
