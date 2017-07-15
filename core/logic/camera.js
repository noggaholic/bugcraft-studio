
const cameraBufferSize = 0x48;
const cameraBuffer     = new Buffer(cameraBufferSize);
const cameraPosition   = new Buffer(0xC);
const robot            = require('robot-js');
const Keyboard         = robot.Keyboard;
module.exports = (process, module, memory, window) => {

  const camera = {
    viewMatrix: [
      [0, 0, 0,],
      [0, 0, 0,],
      [0, 0, 0,]
    ],
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    forward: {
      x: 0,
      y: 0,
      z: 0
    },
    Fov: 0,
    NearClip: 0,
    FarClip:  0,
    Aspect:   0
  };

  /**
   * Thanks to https://stackoverflow.com/questions/11338470/how-can-i-move-a-transform-in-the-forward-direction
   * for helping me to understand this shit.
   * @return {[type]} [description]
   */
  const getCameraData = () => {
    memory.readData(0x0F69B008, cameraBuffer, cameraBufferSize);

    camera.position.x = cameraBuffer.readFloatLE(0x8);
    camera.position.y = cameraBuffer.readFloatLE(0xC);
    camera.position.z = cameraBuffer.readFloatLE(0x10);

    camera.viewMatrix[0][0] = cameraBuffer.readFloatLE(0x14);
    camera.viewMatrix[0][1] = cameraBuffer.readFloatLE(0x18);
    camera.viewMatrix[0][2] = cameraBuffer.readFloatLE(0x1C);

    camera.viewMatrix[1][0] = cameraBuffer.readFloatLE(0x20);
    camera.viewMatrix[1][1] = cameraBuffer.readFloatLE(0x24);
    camera.viewMatrix[1][2] = cameraBuffer.readFloatLE(0x28);

    camera.viewMatrix[2][0] = cameraBuffer.readFloatLE(0x2C);
    camera.viewMatrix[2][1] = cameraBuffer.readFloatLE(0x30);
    camera.viewMatrix[2][2] = cameraBuffer.readFloatLE(0x34);

    /**
     * First row of the View Matrix is the forward vector
     */
    camera.forward.x = camera.viewMatrix[0][0];
    camera.forward.y = camera.viewMatrix[0][1];
    camera.forward.z = camera.viewMatrix[0][2];

    camera.Fov      = cameraBuffer.readFloatLE(0x38);
    camera.NearClip = cameraBuffer.readFloatLE(0x3C);
    camera.FarClip  = cameraBuffer.readFloatLE(0x40);
    camera.Aspect   = cameraBuffer.readFloatLE(0x44);
    return camera;
  }

  const setCameraPosition = (x, y, z) => {
    console.log(Date.now(), x, y, z);
    cameraPosition.writeFloatLE(x, 0x0);
    cameraPosition.writeFloatLE(y, 0x4);
    cameraPosition.writeFloatLE(z, 0x8);
    memory.writeData(0x0F69B008 + 0x8, cameraPosition, 0xC);
  };

  setInterval(() => {
    if (robot.Window.getActive().getTitle() !== "World of Warcraft") {
      return; // only move the camera if the current window is the game window
    }
    if(Keyboard.getState(robot.KEY_W)) {
      const data = getCameraData();
      const x = camera.position.x + camera.forward.x * 2;
      const y = camera.position.y + camera.forward.y * 2;
      const z = camera.position.z + camera.forward.z * 2;
      setCameraPosition(x, y, z);
    }
    if(Keyboard.getState(robot.KEY_S)) {
      const data = getCameraData();
      const x = camera.position.x - camera.forward.x * 2;
      const y = camera.position.y - camera.forward.y * 2;
      const z = camera.position.z - camera.forward.z * 2;
      setCameraPosition(x, y, z);
    }
  }, 16);

  return {
    enableSpectator: () => {
      const data = getCameraData();
      console.log('data',             data);
      console.log('data.position',    data.position);
      console.log('data.viewMatrix',  data.viewMatrix);
      console.log('data.forward',     data.forward);
    }
  }
}
