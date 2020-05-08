/* eslint-disable no-bitwise */
function SetRenderFlags(Memory) {
    const SetRenderFlagsBuffer = new Buffer(4);
    return (environmentStruct, renderFlags) => {
      const renderFlagsPtr = environmentStruct.renderFlags;
      if (!renderFlagsPtr) return;
      SetRenderFlagsBuffer.writeUInt8(renderFlags[0], 0);
      SetRenderFlagsBuffer.writeUInt8(renderFlags[1], 1);
      SetRenderFlagsBuffer.writeUInt8(renderFlags[2], 2);
      SetRenderFlagsBuffer.writeUInt8(renderFlags[3], 3);
      Memory.writeData(renderFlagsPtr, SetRenderFlagsBuffer, SetRenderFlagsBuffer.byteLength);
    };
}

module.exports = SetRenderFlags;
