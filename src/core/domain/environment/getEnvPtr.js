function GetEnvPtr(Game, memory, Module, offsets) {
    return () => {
      if (!offsets[Game.client].environment) return { timeOfDay: 0 };
      const timeOfDay = Module + offsets[Game.client].environment.version[Game.build].timeOfDay;
      const timeOfDayPattern = offsets[Game.client].environment.version[Game.build].timeOfDayPattern;
      const enableTimeOfDay = timeOfDayPattern ? memory.find(timeOfDayPattern.toString('hex'), 0, -1, 1, '-x')[0] : 0;
    return {
      timeOfDay,
      enableTimeOfDay,
    };
  };
}

module.exports = GetEnvPtr;
