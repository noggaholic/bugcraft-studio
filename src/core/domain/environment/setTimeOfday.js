
function SetTimeOfday(Memory, GetNormalizedTimeOfDay) {
    const timeOfDayBuffer = new Buffer(0x4);
    return (environmentStruct, { hour, minutes }) => {
      const timeOfDayPtr = environmentStruct.timeOfDay;
      if (!timeOfDayPtr) return;
      const timeNormalized = GetNormalizedTimeOfDay(hour, minutes);
      timeOfDayBuffer.writeFloatLE(timeNormalized);
      Memory.writeData(timeOfDayPtr, timeOfDayBuffer, timeOfDayBuffer.byteLength);
    };
}

module.exports = SetTimeOfday;
