
function enableSpectateMode(Game, Memory, Offsets) {
  return (CameraStruct) => {
    const {
      InstructionPointer,
      SpectatePointer,
    } = CameraStruct;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(InstructionPointer, Offsets[Game.client].camera.pattern, Offsets[Game.client].camera.pattern.byteLength);
    } else {
      Memory.writeData(SpectatePointer, Offsets[Game.client].DisableSpectate, Offsets[Game.client].DisableSpectate.byteLength);
    }
  };
}

module.exports = enableSpectateMode;
