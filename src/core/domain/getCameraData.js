
/**
 * Thanks to https://stackoverflow.com/questions/11338470/how-can-i-move-a-transform-in-the-forward-direction
 * for helping me to understand this shit.
 * @return {[type]} [description]
 */
const clonedeep = require('lodash.clonedeep');
const cameraBufferSize = 0x48;
const cameraBuffer = new Buffer(cameraBufferSize);

const cameraRotBufferSize = 0xC;
const cameraRotBuffer = new Buffer(cameraRotBufferSize);

function GetCameraData(Offsets, Game, Memory) {
    return (Pointer) => {
      const camera = getCameraStruct();
      const rotationPtr = Offsets[Game.client].CameraRot;
      Memory.readData(Pointer, cameraBuffer, cameraBufferSize);
      Memory.readData(Pointer + rotationPtr, cameraRotBuffer, cameraRotBufferSize);

      camera.position.x = cameraBuffer.readFloatLE(0x8);
      camera.position.y = cameraBuffer.readFloatLE(0xC);
      camera.position.z = cameraBuffer.readFloatLE(0x10);

      camera.viewMatrix[0][0] = cameraBuffer.readFloatLE(0x14);
      camera.viewMatrix[0][1] = cameraBuffer.readFloatLE(0x18);
      camera.viewMatrix[0][2] = cameraBuffer.readFloatLE(0x1C);

      /**
       * First row of the View Matrix is the forward vector
       */
      camera.forward.x = camera.viewMatrix[0][0];
      camera.forward.y = camera.viewMatrix[0][1];
      camera.forward.z = camera.viewMatrix[0][2];

      camera.yaw = cameraRotBuffer.readFloatLE(0);
      camera.pitch = cameraRotBuffer.readFloatLE(4);
      camera.roll = cameraRotBuffer.readFloatLE(8);

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
    forward: {
      x: 0,
      y: 0,
      z: 0,
    },
    yaw: 0,
    pitch: 0,
    roll: 0,
    Fov: 0,
    NearClip: 0,
    FarClip: 0,
    Aspect: 0,
  };
}

module.exports = GetCameraData;
