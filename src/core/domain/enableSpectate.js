
function enableSpectateMode(Game, Memory, Offsets, Module, GetCameraData, SetPosition) {
  return (CameraStruct) => {
    const {
      InstructionPointer,
      SpectatePointer,
      Pointer,
      CameraValuesPointer,
    } = CameraStruct;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      const fixPositionPattern = Offsets[Game.client].camera.position[Game.build].fix;
      Memory.writeData(InstructionPointer, fixPositionPattern, fixPositionPattern.byteLength);
    } else if (Game.client === 'ctl') {
      const { position } = GetCameraData(Pointer);
      SetPosition(CameraValuesPointer, position.x, position.y, position.z);
      Memory.writeData(Module + Offsets[Game.client].SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
      Memory.writeData(Pointer + Offsets[Game.client].EnableCorrectKeyboardControls, Offsets[Game.client].EnableSpectateOnCam, Offsets[Game.client].EnableSpectateOnCam.byteLength);
    } else {
      const { position } = GetCameraData(Pointer);
      SetPosition(CameraValuesPointer, position.x, position.y, position.z);
      Memory.writeData(SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
    }
  };
}

module.exports = enableSpectateMode;
