
function disableViewMatrixUpdate(Game, Memory, Offsets) {
  return (ViewMatrixInstructionsPointer) => {
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(ViewMatrixInstructionsPointer,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].fix,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].fix.byteLength,
        );
    }
  };
}

module.exports = disableViewMatrixUpdate;
