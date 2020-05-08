function resetRenderFlags(Memory) {
    const SetRenderFlagsBuffer = new Buffer(4);
    return (environmentStruct) => {
      const renderFlagsPtr = environmentStruct.renderFlags;
      const renderFlagsDefault = environmentStruct.renderFlagsDefault;
      if (!renderFlagsPtr) return;
      SetRenderFlagsBuffer.writeUInt32LE(renderFlagsDefault);
      console.log('# SetRenderFlagsBuffer', SetRenderFlagsBuffer.toString('hex'));
      Memory.writeData(renderFlagsPtr, SetRenderFlagsBuffer, SetRenderFlagsBuffer.byteLength);
    };
}

module.exports = resetRenderFlags;