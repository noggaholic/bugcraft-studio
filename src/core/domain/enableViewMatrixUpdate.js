
function enableViewMatrixUpdate(Game, Memory, Offsets) {
  return (ViewMatrixInstructionsPointer) => {
      Memory.writeData(ViewMatrixInstructionsPointer,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].pattern,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].pattern.byteLength,
        );
  };
}

module.exports = enableViewMatrixUpdate;
