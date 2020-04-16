
function enableSpectateMode(Game, Memory, Offsets, GetCameraData) {
  return (CameraStruct) => {
    const {
      InstructionPointer,
      SpectatePointer,
      Pointer,
    } = CameraStruct;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(InstructionPointer, Offsets[Game.client].camera.fix, Offsets[Game.client].camera.fix.byteLength);
    } else {
      // SetPosition()...
      Memory.writeData(SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
    }
  };
}

module.exports = enableSpectateMode;
