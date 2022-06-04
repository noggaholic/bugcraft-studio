
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

const nearFarClipSize = 0x14;
const nearFarClipBuffer = new Buffer(nearFarClipSize);

function GetCameraData(Offsets, Game, Memory) {
    return (Pointer) => {
      const camera = getCameraStruct();
      const rotationPtr = Offsets[Game.client].CameraRot;
      Memory.readData(Pointer, cameraBuffer, cameraBufferSize);
      Memory.readData(Pointer + rotationPtr, cameraRotBuffer, cameraRotBufferSize);

      const cameraPositionOffset = Offsets[Game.client].CameraPositionOffset;
      camera.position.x = cameraBuffer.readFloatLE(cameraPositionOffset);
      camera.position.y = cameraBuffer.readFloatLE(cameraPositionOffset + 4);
      camera.position.z = cameraBuffer.readFloatLE(cameraPositionOffset + 8);

      const cameraViewMatrixOffset = Offsets[Game.client].CameraViewMatrixOffset;
      camera.viewMatrix[0][0] = cameraBuffer.readFloatLE(cameraViewMatrixOffset);
      camera.viewMatrix[0][1] = cameraBuffer.readFloatLE(cameraViewMatrixOffset + 4);
      camera.viewMatrix[0][2] = cameraBuffer.readFloatLE(cameraViewMatrixOffset + 8);

      /**
       * First row of the View Matrix is the forward vector
       */
      camera.forward.x = camera.viewMatrix[0][0];
      camera.forward.y = camera.viewMatrix[0][1];
      camera.forward.z = camera.viewMatrix[0][2];

      camera.yaw = cameraRotBuffer.readFloatLE(0);
      camera.pitch = cameraRotBuffer.readFloatLE(4);
      camera.roll = cameraRotBuffer.readFloatLE(8);

      const cameraFovOffset = Offsets[Game.client].CameraFovOffset;
      camera.Fov = cameraBuffer.readFloatLE(cameraFovOffset);

      const worldScenePointer = Offsets[Game.client].base.version[Game.build].WorldScenePointer;
      if (worldScenePointer) { // bfa+
        const oWorldSceneNearFarClip = Offsets[Game.client].base.version[Game.build].WorldSceneNearFarClipOffset;
        Memory.readData(worldScenePointer + oWorldSceneNearFarClip, nearFarClipBuffer, nearFarClipSize);
        camera.NearClip = nearFarClipBuffer.readFloatLE(0);
        camera.FarClip = nearFarClipBuffer.readFloatLE(4);
        camera.Aspect = nearFarClipBuffer.readFloatLE(16);
      } else {
        camera.NearClip = cameraBuffer.readFloatLE(0x3C);
        camera.FarClip = cameraBuffer.readFloatLE(0x40);
        camera.Aspect = cameraBuffer.readFloatLE(0x44);
      }
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
