/* eslint-disable no-bitwise */
function SetRenderFlags(Memory, GetRenderFlags) {
  const SetRenderFlagsBuffer = new Buffer(1);
  let value;
  return (environmentStruct, index, isNegative = false) => {
    const renderIndex = Number(index);
    const renderFlagsPtr = environmentStruct.renderFlags;
    if (!renderFlagsPtr) return;
    const renderFlags = GetRenderFlags(environmentStruct, renderIndex);
    if (!isNegative) value = renderFlags + 1;
    if (isNegative) value = renderFlags - 1;
    if (value > 255 || value < 0) return;
    SetRenderFlagsBuffer.writeUInt8(value);
    Memory.writeData(renderFlagsPtr + index, SetRenderFlagsBuffer, SetRenderFlagsBuffer.byteLength);
  };
  }

module.exports = SetRenderFlags;
