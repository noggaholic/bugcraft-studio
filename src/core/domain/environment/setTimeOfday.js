
function SetTimeOfday(Game, Memory, Offsets, Module) {
    const timeOfDayBuffer = new Buffer(0x4);
    return (environmentStruct, { hour, minutes }) => {
      const timeOfDayPtr = environmentStruct.timeOfDay;
      if (!timeOfDayPtr) return;
      const timeNormalized = ((3600 * hour) + (60 * minutes)) / 86400;
      timeOfDayBuffer.writeFloatLE(timeNormalized);
      Memory.writeData(timeOfDayPtr, timeOfDayBuffer, timeOfDayBuffer.byteLength);
    };
}

module.exports = SetTimeOfday;
