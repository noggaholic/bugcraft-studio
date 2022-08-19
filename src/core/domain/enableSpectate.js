const flagsBufferSize = 4;
const flagsBuffer = new Buffer(flagsBufferSize);

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
      SetPosition(CameraStruct, position.x, position.y, position.z);
      Memory.writeData(Module + Offsets[Game.client].SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
      Memory.writeData(Pointer + Offsets[Game.client].EnableCorrectKeyboardControls, Offsets[Game.client].EnableSpectateOnCam, Offsets[Game.client].EnableSpectateOnCam.byteLength);
    } else {
      const { position } = GetCameraData(Pointer);
      SetPosition(CameraStruct, position.x, position.y, position.z);

      if (Offsets[Game.client].base.version[Game.build].PlayerPointer) {
        Memory.readData(SpectatePointer, flagsBuffer, 4);
        const flags = flagsBuffer.readUInt32LE() | Offsets[Game.client].SpectateFlags;
        flagsBuffer.fill();
        flagsBuffer.writeUInt32LE(flags);
        Memory.writeData(SpectatePointer, flagsBuffer, 4);
      } else {
        Memory.writeData(SpectatePointer, Offsets[Game.client].EnableSpectate, Offsets[Game.client].EnableSpectate.byteLength);
      }
    }
  };
}

module.exports = enableSpectateMode;
