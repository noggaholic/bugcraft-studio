
function SetCameraView(Game, Memory, Offsets, SetPosition) {
  const viewMatrixBuffer = new Buffer(0x24);
  const cameraRotBuffer = new Buffer(0xC);
  return (CameraStruct, view) => {
    const { x, y, z } = view;
    const matrix = [
      [view.viewMatrix00, view.viewMatrix01, view.viewMatrix02],
      [view.viewMatrix10, view.viewMatrix11, view.viewMatrix12],
      [view.viewMatrix20, view.viewMatrix21, view.viewMatrix22],
    ];


    const rotation = view.rotation;
    const angle = rotation * 180 / Math.PI;
    const clamped = angle + Math.ceil(-angle / 360) * 360;
    const finalRotation = clamped * Math.PI / 180;

    //console.log(`{ rotation: ${view.rotation} }`, finalRotation);

    cameraRotBuffer.writeFloatLE(view.CameraRotx, 0);
    cameraRotBuffer.writeFloatLE(view.rotation, 4);
    cameraRotBuffer.writeFloatLE(view.CameraRotz, 8);
    setViewMatrix(CameraStruct, x, y, z, matrix);
  };
  function setViewMatrix(CameraStruct, x, y, z, viewMatrix) {
    const { Pointer, CameraValuesPointer } = CameraStruct;
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][0], 0x0);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][1], 0x4);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][2], 0x8);

    viewMatrixBuffer.writeFloatLE(viewMatrix[1][0], 0xC);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][1], 0x10);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][2], 0x14);

    viewMatrixBuffer.writeFloatLE(viewMatrix[2][0], 0x18);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][1], 0x1C);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][2], 0x20);
    // Memory.writeData(Pointer + 0x14, viewMatrixBuffer, viewMatrixBuffer.byteLength);

    const rotationPtr = Offsets[Game.client].CameraRot;
    Memory.writeData(Pointer + rotationPtr, cameraRotBuffer, cameraRotBuffer.byteLength);
    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      SetPosition(Pointer, x, y, z);
    } else {
      SetPosition(CameraValuesPointer, x, y, z);
    }
  }
}

module.exports = SetCameraView;
