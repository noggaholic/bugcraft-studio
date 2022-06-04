const flagsBufferSize = 4;
const flagsBuffer = new Buffer(flagsBufferSize);

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
    } else if (Offsets[Game.client].base.version[Game.build].PlayerPointer) {
      Memory.readData(SpectatePointer, flagsBuffer, 4);
      const flags = flagsBuffer.readUInt32LE() & ~Offsets[Game.client].SpectateFlags;
      flagsBuffer.fill();
      flagsBuffer.writeUInt32LE(flags);
      Memory.writeData(SpectatePointer, flagsBuffer, 4);
    } else {
      Memory.writeData(SpectatePointer, Offsets[Game.client].DisableSpectate, Offsets[Game.client].DisableSpectate.byteLength);
    }
  };
}

module.exports = disableSpectate;
