
function disableViewMatrixUpdate(Game, Memory, Offsets) {
  return (ViewMatrixInstructionsPointer) => {
      Memory.writeData(ViewMatrixInstructionsPointer,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].fix,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].fix.byteLength,
        );
  };
}

module.exports = disableViewMatrixUpdate;
