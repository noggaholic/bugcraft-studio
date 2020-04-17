
function enableSpectateMode(Game, Memory, Offsets, GetCameraData, SetPosition) {
  return (CameraStruct) => {
    const {
      InstructionPointer,
      SpectatePointer,
      Pointer,
      CameraValuesPointer,
    } = CameraStruct;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(InstructionPointer, Offsets[Game.client].camera.fix, Offsets[Game.client].camera.fix.byteLength);
    } else {
      const { position } = GetCameraData(Pointer);
      SetPosition(CameraValuesPointer, position.x, position.y, position.z);
      Memory.writeData(SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
    }
  };
}

module.exports = enableSpectateMode;
