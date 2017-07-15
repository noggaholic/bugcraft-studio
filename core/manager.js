const createCamera = require('./logic/camera.js');

module.exports = (process, module, memory, window, offets) => {

  const camera = createCamera(process, module, memory, window, offets);

  return {
    sendMessage: (kind, data) => {
      switch (kind) {
        case 'ENABLE_SPECTATOR':
          camera.enableSpectator();
          break;
        default:
      }
    }
  }
};
