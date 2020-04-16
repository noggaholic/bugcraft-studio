
function setCollision(Game, Memory, Offsets) {
  const speedBuffer = new Buffer(0x4);
  return (CameraStruct, speed) => {
    const { CameraValuesPointer } = CameraStruct;
    const speedPtr = CameraValuesPointer + Offsets[Game.client].Speed;
    const finalSpeed = speed * 200;
    speedBuffer.writeFloatLE(finalSpeed, 0);
    Memory.writeData(speedPtr, speedBuffer, speedBuffer.byteLength);
  };
}

module.exports = setCollision;
