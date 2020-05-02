
function SetCameraView(Game, Memory, Offsets, SetPosition) {
  const cameraRotBuffer = new Buffer(0xC);
  return (CameraStruct, view) => {
    const { x, y, z } = view;
    cameraRotBuffer.writeFloatLE(view.yaw, 0);
    cameraRotBuffer.writeFloatLE(view.pitch, 4);
    cameraRotBuffer.writeFloatLE(view.roll, 8);
    setViewMatrix(CameraStruct, x, y, z);
  };
  function setViewMatrix(CameraStruct, x, y, z) {
    const { Pointer, CameraValuesPointer } = CameraStruct;
    const rotationPtr = Offsets[Game.client].CameraRot;
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(Pointer + rotationPtr, cameraRotBuffer, cameraRotBuffer.byteLength);
      SetPosition(Pointer, x, y, z);
    } else {
      Memory.writeData(Pointer + rotationPtr, cameraRotBuffer, cameraRotBuffer.byteLength);
      SetPosition(CameraValuesPointer, x, y, z);
    }
  }
}

module.exports = SetCameraView;
