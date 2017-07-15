module.exports = (process, module, memory, window) => {
  return {
    sendMessage: (kind, data) => {
      switch (kind) {
        case 'ENABLE_SPECTATOR':
          console.log('ENABLE_SPECTATOR');
          break;
        default:
      }
    }
  }
};
