
function EnableTimeOfDayUpdate(Game, Memory, Offsets) {
    return ({ enableTimeOfDay }) => {
      if (!enableTimeOfDay) return;
      const enableUpdateOfTimeOfday = Offsets[Game.client].environment.version[Game.build].timeOfDayPatternFix;
      Memory.writeData(enableTimeOfDay, enableUpdateOfTimeOfday, enableUpdateOfTimeOfday.byteLength);
    };
}

module.exports = EnableTimeOfDayUpdate;
