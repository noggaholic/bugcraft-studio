'use strict';

module.exports = (cb) => {

  const createProgram = require('./manager.js');
  const patterns      = require('./logic/patterns.js');

  const init = (err, process, module, memory, window) => {
    if (err) {
      return cb(err);
    }

    const program = createProgram(process, module, memory, window, patterns);
    return cb(err, program);
  };

  return require('./initialize')(init);
};
