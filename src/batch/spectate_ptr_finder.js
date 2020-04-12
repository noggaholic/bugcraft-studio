/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
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

    // 03 00 00 00 08 4D FF 19 00 00 00 00 A4 A5 8A 00 0C 00 00 00 14 A3 FF 19
    // 6C 03 00 00 6C 03 00 00 01 00 00 00 38 BD A0 00 0C 00 00 00 54 52 84 1B

    const clients = [
      { 
        version: '2.2.4',
        pattern: '08 18 E3 19 04 00 00 00 10 00 00 00 10 00 00 00 08 4C FF 19 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00'
      },
      {
        version: '3.3.5a',
        pattern: '38 4E 84 1B 0A 00 00 00 04 00 00 00 04 00 00 00 E8 CA 3E 1A 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00'
      }
    ];
      for (let index = 0; index < clients.length; index++) {
        const client = clients[index];
        const patternFind = memory.find(client.pattern, 0, -1);
        if (patternFind.length > 0) {
          console.log(`# Pattern found for version ${client.version}`, ` at memory address: 0x${((patternFind[0]).toString(16)).toUpperCase()}`, 'results', patternFind);
        } else {
          console.log(`# Pattern NOT FOUND for version ${client.version}`);
        }
      }
    process.exit(0);
});
