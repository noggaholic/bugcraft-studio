
function setCollision(Game, Memory, Offsets) {
  const collisionBuffer = new Buffer(0x4);
  return (CameraValuesPointer, isEnabled) => {
    const collisionPtr = CameraValuesPointer + Offsets[Game.client].Collision;
    if (isEnabled) {
      collisionBuffer.writeInt32LE(1, 0);
      Memory.writeData(collisionPtr, collisionBuffer, collisionBuffer.byteLength);
      return;
    }
    collisionBuffer.writeInt32LE(0, 0);
    Memory.writeData(collisionPtr, collisionBuffer, collisionBuffer.byteLength);
  };
}

module.exports = setCollision;
