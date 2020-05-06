
function EnableTimeOfDayUpdate(Game, Memory, Offsets) {
  const timeOfDaySpeedBuffer = new Buffer(4);
  timeOfDaySpeedBuffer.writeFloatLE(0);
  return ({ enableTimeOfDay, timeOfDaySpeed }) => {
    if (timeOfDaySpeed) {
      Memory.writeData(timeOfDaySpeed, timeOfDaySpeedBuffer, timeOfDaySpeedBuffer.byteLength);
    }
    if (!enableTimeOfDay) return;
    const enableUpdateOfTimeOfday = Offsets[Game.client].environment.version[Game.build].timeOfDayPatternFix;
    Memory.writeData(enableTimeOfDay, enableUpdateOfTimeOfday, enableUpdateOfTimeOfday.byteLength);
  };
}

module.exports = EnableTimeOfDayUpdate;
