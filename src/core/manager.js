/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks */
const createCamera = require('./logic/camera.js');
const createGetCametaPtr = require('./domain/getCameraPtr');

module.exports = (process, module, memory, window, patterns) => {

  const gameVersion = patterns.getVersion(memory);
  if (!gameVersion) {
    throw new Error('Unsupported game version :|');
  }
  const GetCametaPtr = createGetCametaPtr(gameVersion, memory, patterns);
  const camera = createCamera(GetCametaPtr)(gameVersion, memory, patterns);

  return {
    camera,
  };
};
