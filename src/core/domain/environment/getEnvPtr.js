function GetEnvPtr(Game, memory, Module, offsets) {
    return () => {
      if (!offsets[Game.client].environment) return { timeOfDay: 0 };
      const timeOfDay = Module + offsets[Game.client].environment.version[Game.build].timeOfDay;

    return {
      timeOfDay,
    };
  };
}

module.exports = GetEnvPtr;
