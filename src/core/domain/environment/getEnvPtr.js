function GetEnvPtr(Game, memory, Module, offsets) {
    return () => {
      const timeOfDay = Module + offsets[Game.client].environment.version[Game.build].timeOfDay;

    return {
      timeOfDay,
    };
  };
}

module.exports = GetEnvPtr;
