
function SetNormalizedTimeOfDay(Memory) {
    const timeOfDayBuffer = new Buffer(0x4);
    return (environmentStruct, timeOfDay) => {
      const timeOfDayPtr = environmentStruct.timeOfDay;
      if (!timeOfDayPtr) return;
      timeOfDayBuffer.writeFloatLE(timeOfDay);
      Memory.writeData(timeOfDayPtr, timeOfDayBuffer, timeOfDayBuffer.byteLength);
    };
}

module.exports = SetNormalizedTimeOfDay;
