
function SetCameraView(Memory, SetPosition) {
  const viewMatrixBuffer = new Buffer(0x24);
  return (Pointer, view) => {
    const { x, y, z } = view;
    const matrix = [
      [view.viewMatrix00, view.viewMatrix01, view.viewMatrix02],
      [view.viewMatrix10, view.viewMatrix11, view.viewMatrix12],
      [view.viewMatrix20, view.viewMatrix21, view.viewMatrix22],
    ];
    setViewMatrix(Pointer, x, y, z, matrix);
  };
  function setViewMatrix(Pointer, x, y, z, viewMatrix) {
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][0], 0x0);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][1], 0x4);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][2], 0x8);

    viewMatrixBuffer.writeFloatLE(viewMatrix[1][0], 0xC);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][1], 0x10);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][2], 0x14);

    viewMatrixBuffer.writeFloatLE(viewMatrix[2][0], 0x18);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][1], 0x1C);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][2], 0x20);

    SetPosition(Pointer, x, y, z);
    Memory.writeData(Pointer + 0x14, viewMatrixBuffer, viewMatrixBuffer.byteLength);
  }
}

module.exports = SetCameraView;
