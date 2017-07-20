var robot   = require('robot-js');

var Memory  = robot.Memory;
var Window  = robot.Window;

module.exports = (cb) => {

  let memory;
  let process;
  let module;
  let window;

  const GAME_WINDOW = "World of Warcraft";

  /*
   * Resolves the given multi level pointer to
   * the correct offset of the memory
   */
  const readMultiLevelPtr = function(offsets) {
    var address = module + Number(offsets[0]);
    for (var i = 1; i < offsets.length; i++) {
      address = memory.readPtr(address);
      address += offsets[i];
    }
    return address;
  };

  const ptrContainer = new Buffer(0x4);

  const reverseArrayOfBytes = (buffPtr) => {
    return buffPtr.toString('hex').match(/[a-fA-F0-9]{2}/g).reverse().join('');
  };

  const resolvePtrBySetOfInstruction = (patternBase, ptrFix) => {
    ptrFix = ptrFix || 0;
    let patternPtr = findPattern(patternBase.pattern.toString('hex'));
    if (patternPtr.length === 0) return;
    patternPtr = patternPtr.shift();
    patternPtr += patternBase.patternFix;
    memory.readData(patternPtr, ptrContainer, ptrContainer.byteLength);
    const ptr = reverseArrayOfBytes(ptrContainer);
    return memory.readPtr((parseInt(ptr, 16) + ptrFix));
  };

  const findPattern = (pattern) => {
    return memory.find(pattern, 0, -1, 1, "-x");
  }

  const findStrPattern = (str) => {
    var searchPattern = Buffer.from(str).toString('hex');
    return memory.find(searchPattern, 0, -1, 1);
  }

  function selectByWindow(wind) {
    // Check if arguments are correct
    if (!(wind instanceof Window)) {
      throw new TypeError('Invalid arguments');
    }

    // Check if the window title correctly matches
    if (wind.getTitle() !== GAME_WINDOW) {
      return false;
    }

    process = wind.getProcess();
    // Ensure that the process was opened
    if (!process.isValid()) return false;
    /* eslint-disable quotes, no-useless-escape */
    module = process.getModules(".*\.exe")[0];
    if (!module) return false;
    module = module.getBase();

    // Determine if game is 64Bit
    let is64Bit = process.is64Bit();

    if (is64Bit) {
      return cb(new Error('64bit process is not supported at the moment'));
    }

    // Create a new memory object
    memory = Memory(process);
    memory.readMultiLevelPtr            = readMultiLevelPtr;
    memory.resolvePtrBySetOfInstruction = resolvePtrBySetOfInstruction;
    memory.findPattern                  = findPattern;
    memory.findStrPattern               = findStrPattern;
    window = wind;
    return true;
  }

  for (let w of Window.getList(GAME_WINDOW)) {
    if (selectByWindow(w)) {
      return cb(null, process, module, memory, w);
    }
  }

  return cb(new Error('Cannot open process'));
};
