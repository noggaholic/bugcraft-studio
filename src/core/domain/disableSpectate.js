
function disableSpectate(Game, Memory, Offsets, Module) {
  return (CameraStruct) => {
    const {
      Pointer,
      InstructionPointer,
      SpectatePointer,
    } = CameraStruct;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      const fixPositionPattern = Offsets[Game.client].camera.position[Game.build].pattern;
      Memory.writeData(InstructionPointer, fixPositionPattern, fixPositionPattern.byteLength);
    } else if (Game.client === 'ctl') {
      Memory.writeData(Module + Offsets[Game.client].SpectatePointer, Offsets[Game.client].DisableSpectate, Offsets[Game.client].DisableSpectate.byteLength);
      Memory.writeData(Pointer + Offsets[Game.client].EnableCorrectKeyboardControls, Offsets[Game.client].DisableSpectateOnCam, Offsets[Game.client].DisableSpectateOnCam.byteLength);
    } else {
      Memory.writeData(SpectatePointer, Offsets[Game.client].DisableSpectate, Offsets[Game.client].DisableSpectate.byteLength);
    }
  };
}

module.exports = disableSpectate;
