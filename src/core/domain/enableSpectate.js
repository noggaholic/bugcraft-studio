
function enableSpectateMode(Game, Memory, Offsets) {
  return (InstructionPointer) => {
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(InstructionPointer, Offsets[Game.client].camera.fix, Offsets[Game.client].camera.fix.byteLength);
    } else {
      
    }
  };
}

module.exports = enableSpectateMode;
