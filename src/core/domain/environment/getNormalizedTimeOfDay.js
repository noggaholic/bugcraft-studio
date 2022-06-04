function GetNormalizedTimeOfDay(Game) {
    return (hour, minutes) => {
      if (Game.client === 'mop' ||
          Game.client === 'draenor' ||
            Game.client === 'legion' || Game.client === 'bfa') return (((3600 * hour) + (60 * minutes)) / 86400) * 1440;
      return ((3600 * hour) + (60 * minutes)) / 86400;
    };
  }

module.exports = GetNormalizedTimeOfDay;
