const initialize = require('./initialize');

function launchCore(cb) {
  
    
  const init = (err, process, module, memory, window) => {
    if (err) {
      return cb(err);
    }

    return cb(err, process, module, memory, window);
  };
  return initialize(init);
}

launchCore((err, process, module, memory, window) => {
    console.log('# err, process, module, memory, window', err, process, module, memory, window);
    const patternFind = memory.find('? ? ? ? 04 00 00 00 10 00 00 00 10 00 00 00 ? ? ? ? 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00', 0, -1);
    if (patternFind.length > 0) console.log('# Pattern found for spectate', patternFind, `0x${((patternFind[0]).toString(16)).toUpperCase()}`);
})