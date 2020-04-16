
function enableSpectateMode(Game, Memory, Offsets) {
  return (InstructionPointer) => {
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(InstructionPointer, Offsets[Game.client].camera.pattern, Offsets[Game.client].camera.pattern.byteLength);
    }
  };
}

module.exports = enableSpectateMode;
