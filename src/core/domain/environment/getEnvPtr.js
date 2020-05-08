function GetEnvPtr(Game, memory, Module, offsets) {
    return () => {
      if (!offsets[Game.client].environment) return { timeOfDay: 0 };
      const timeOfDay = Module + offsets[Game.client].environment.version[Game.build].timeOfDay;
      const timeOfDaySpeed = Module + offsets[Game.client].environment.version[Game.build].timeOfDaySpeed;
      const timeOfDayPattern = offsets[Game.client].environment.version[Game.build].timeOfDayPattern;
      const renderFlags = Module + offsets[Game.client].environment.version[Game.build].renderFlags;
      const renderFlagsDefault = offsets[Game.client].environment.version[Game.build].renderFlagsDefault;
      const enableTimeOfDay = timeOfDayPattern ? memory.find(timeOfDayPattern.toString('hex'), 0, -1, 1, '-x')[0] : 0;

      console.log(`# Time of day at: 0x${timeOfDay.toString(16)}`);
      if (timeOfDaySpeed) console.log(`# Time of day speed at: 0x${timeOfDaySpeed.toString(16)}`);
      if (renderFlags) console.log(`# Render flags located at: 0x${renderFlags.toString(16)}`);

    return {
      timeOfDay,
      timeOfDaySpeed,
      enableTimeOfDay,
      renderFlags,
      renderFlagsDefault,
    };
  };
}

module.exports = GetEnvPtr;
