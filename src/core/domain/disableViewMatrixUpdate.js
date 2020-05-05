
function disableViewMatrixUpdate(Game, Memory, Offsets) {
  return () => {
    if (Game.client !== 'alpha') return;
    const patterns = Offsets[Game.client].cameraViewMatrix.version[Game.build];
    patterns.forEach((instruction) => {
      Memory.writeData(instruction.offset, instruction.fix, instruction.fix.byteLength);
    });
  };
}

module.exports = disableViewMatrixUpdate;
