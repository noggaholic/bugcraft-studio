
/**
 * Thanks to https://stackoverflow.com/questions/11338470/how-can-i-move-a-transform-in-the-forward-direction
 * for helping me to understand this shit.
 * @return {[type]} [description]
 */
const clonedeep = require('lodash.clonedeep');
const cameraBufferSize = 0x48;
const cameraBuffer = new Buffer(cameraBufferSize);

function GetCameraData(Memory) {
    return (Pointer) => {
      const camera = getCameraStruct();
      Memory.readData(Pointer, cameraBuffer, cameraBufferSize);

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
      camera.yaw.x = camera.viewMatrix[0][0];
      camera.yaw.y = camera.viewMatrix[0][1];
      camera.yaw.z = camera.viewMatrix[0][2];

      camera.pitch.x = camera.viewMatrix[1][0];
      camera.pitch.y = camera.viewMatrix[1][1];
      camera.pitch.z = camera.viewMatrix[1][2];

      camera.roll.x = camera.viewMatrix[2][0];
      camera.roll.y = camera.viewMatrix[2][1];
      camera.roll.z = camera.viewMatrix[2][2];

      camera.Fov = cameraBuffer.readFloatLE(0x38);
      camera.NearClip = cameraBuffer.readFloatLE(0x3C);
      camera.FarClip = cameraBuffer.readFloatLE(0x40);
      camera.Aspect = cameraBuffer.readFloatLE(0x44);
      return clonedeep(camera);
    };
}

function getCameraStruct() {
  return {
    viewMatrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    yaw: {
      x: 0,
      y: 0,
      z: 0,
    },
    pitch: {
      x: 0,
      y: 0,
      z: 0,
    },
    roll: {
      x: 0,
      y: 0,
      z: 0,
    },
    Fov: 0,
    NearClip: 0,
    FarClip: 0,
    Aspect: 0,
  };
}

module.exports = GetCameraData;
