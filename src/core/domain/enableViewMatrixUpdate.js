
function enableViewMatrixUpdate(Game, Memory, Offsets) {
  return () => {
    if (Game.client !== 'alpha') return;
    const patterns = Offsets[Game.client].cameraViewMatrix.version[Game.build];
    patterns.forEach((instruction) => {
      Memory.writeData(instruction.offset, instruction.pattern, instruction.pattern.byteLength);
    });
  };
}

module.exports = enableViewMatrixUpdate;
