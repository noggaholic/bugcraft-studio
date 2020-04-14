/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks */
const createCamera = require('./logic/camera.js');
const createGetCametaPtr = require('./domain/getCameraPtr');
const createEnableSpectate = require('./domain/enableSpectate');
const createDisableSpectate = require('./domain/disableSpectate');
const createEnableViewMatrixUpdate = require('./domain/enableViewMatrixUpdate');
const createDisableViewMatrixUpdate = require('./domain/disableViewMatrixUpdate');

module.exports = (process, module, memory, window, patterns) => {

  const gameVersion = patterns.getVersion(memory);
  if (!gameVersion) {
    throw new Error('Unsupported game version :|');
  }
  const EnableViewMatrixUpdate = createEnableViewMatrixUpdate(gameVersion, memory, patterns);
  const DisableViewMatrixUpdate = createDisableViewMatrixUpdate(gameVersion, memory, patterns);
  const GetCametaPtr = createGetCametaPtr(gameVersion, memory, patterns);
  const EnableSpectate = createEnableSpectate(gameVersion, memory, patterns);
  const DisableSpectate = createDisableSpectate(gameVersion, memory, patterns, EnableViewMatrixUpdate);
  const camera = createCamera(GetCametaPtr, EnableSpectate, DisableSpectate, EnableViewMatrixUpdate, DisableViewMatrixUpdate)(gameVersion, memory, patterns);

  return {
    camera,
  };
};
