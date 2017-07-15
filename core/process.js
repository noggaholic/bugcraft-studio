'use strict';

module.exports = (robot) => {
  return {
    getProcess: (processName) => {
      const prcs    = robot.Process.getList(processName)[0];
      console.log('prcs', prcs);
      console.log('processName', processName);
      console.log('processName', robot.Process.getList(processName));
      const windows = prcs ? prcs.getWindows() : [];
      return {
          process: prcs,
          window: windows[windows.length - 1]
      };
    }
  };
};
