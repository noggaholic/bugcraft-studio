
function enableViewMatrixUpdate(Game, Memory, Offsets) {
  return (ViewMatrixInstructionsPointer) => {
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(ViewMatrixInstructionsPointer,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].pattern,
        Offsets[Game.client].cameraViewMatrix.version[Game.build].pattern.byteLength,
        );
    }
  };
}

module.exports = enableViewMatrixUpdate;
