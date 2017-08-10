/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks */
const createCamera = require('./logic/camera.js');

module.exports = (process, module, memory, window, patterns) => {

  const gameVersion = patterns.getVersion(memory);
  if (!gameVersion) {
    throw new Error('Unsupported game version :|');
  }

  const camera = createCamera(process, module, memory, window, patterns, gameVersion);

  const obj = {
    sendMessage: (kind, data) => {
      switch (kind) {
        case 'ENABLE_SPECTATOR':
          camera.enableSpectator();
          break;
        case 'SET_CAMERA_SPEED':
          camera.setSpeed(data);
          break;
        case 'SET_CAMERA_POSITION':
          camera.setPosition(data);
          break;
        default:
      }
    },
    getMessage: (kind) => {
      switch (kind) {
        case 'CAMERA_VIEW_MATRIX':
          return camera.getViewMatrix();
        default:
      }
    },
  };

  global.obj = obj;

  return obj;
};
