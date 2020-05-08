function GetRenderFlags(Memory) {
  const GetRenderFlagsBuffer = new Buffer(1);
  return (environmentStruct, index) => {
    const renderFlagsPtr = environmentStruct.renderFlags;
    if (!renderFlagsPtr) return;
    Memory.readData(renderFlagsPtr + index, GetRenderFlagsBuffer, GetRenderFlagsBuffer.byteLength);
    return GetRenderFlagsBuffer.readUInt8();
  };
  }

module.exports = GetRenderFlags;
