
function DisableTimeOfDayUpdate(Game, Memory, Offsets) {
  const timeOfDaySpeedBuffer = new Buffer(4);
  timeOfDaySpeedBuffer.writeFloatLE(0.0166666694);
  const timeOfDaySpeedCycleBuffer = new Buffer(4);
  timeOfDaySpeedCycleBuffer.writeFloatLE(1);
  return ({ enableTimeOfDay, timeOfDaySpeed }) => {
    if (timeOfDaySpeed) {
      Memory.writeData(timeOfDaySpeed, timeOfDaySpeedBuffer, timeOfDaySpeedBuffer.byteLength);
      // Force an update cycle
      Memory.writeData(timeOfDaySpeed + 4, timeOfDaySpeedCycleBuffer, timeOfDaySpeedCycleBuffer.byteLength);
    }
    if (!enableTimeOfDay) return;
    const enableUpdateOfTimeOfday = Offsets[Game.client].environment.version[Game.build].timeOfDayPattern;
    Memory.writeData(enableTimeOfDay, enableUpdateOfTimeOfday, enableUpdateOfTimeOfday.byteLength);
  };
}

module.exports = DisableTimeOfDayUpdate;
