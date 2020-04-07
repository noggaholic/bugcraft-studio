/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks,no-multi-spaces,key-spacing,comma-dangle,max-len,no-mixed-operators */
const cameraBufferSize = 0x48;
const cameraBuffer     = new Buffer(cameraBufferSize);
const cameraPosition   = new Buffer(0xC);
const viewMatrixBuffer = new Buffer(0x24);
const robot            = require('robot-js');
const Keyboard         = robot.Keyboard;
const Mouse            = robot.Mouse;
const clonedeep = require('lodash.clonedeep');

/**
 * Add a button to shake the camera like this https://www.youtube.com/watch?v=JNOxz9paA6E
 */

module.exports = (process, module, memory, window, offsets, game) => {

  const cameraInstructionsPtr = memory.find(offsets[game.client].camera.pattern.toString('hex'), 0, -1, 1, '-x')[0];
  const cameraViewMatrixInstructionsPtr = memory.find(offsets[game.client].cameraViewMatrix.pattern.toString('hex'), 0, -1, 1, '-x')[0];

  const instructionBase = offsets[game.client].camera.base;
  const ptrFix          = offsets[game.client].camera.base.version[game.build].ptrFix;
  let cameraPtr         = memory.resolvePtrBySetOfInstruction(instructionBase, ptrFix);

  /**
   * Move this somewhere
  */
  if (game.client === 'alpha') {
    cameraPtr += 0xC4;
  }

  if (!cameraPtr) {
    throw new Error('Can\'t find camera');
  }

  let isSpectatorEnabled = true;
  let isCinematicModeEnabled = false;
  let cinematicCbListener = null;
  let spectatorInterval  = null;
  let cinematicModeInterval = null;
  let speed              = 0.60;
  const camera = {
    viewMatrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
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
    memory.readData(cameraPtr, cameraBuffer, cameraBufferSize);

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
    return clonedeep(camera);
  };

  const setPosition = (x, y, z) => {
    cameraPosition.writeFloatLE(x, 0x0);
    cameraPosition.writeFloatLE(y, 0x4);
    cameraPosition.writeFloatLE(z, 0x8);
    memory.writeData(cameraPtr + 0x8, cameraPosition, 0xC);
  };

  const setViewMatrix = (x, y, z, viewMatrix) => {
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][0], 0x0);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][1], 0x4);
    viewMatrixBuffer.writeFloatLE(viewMatrix[0][2], 0x8);

    viewMatrixBuffer.writeFloatLE(viewMatrix[1][0], 0xC);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][1], 0x10);
    viewMatrixBuffer.writeFloatLE(viewMatrix[1][2], 0x14);

    viewMatrixBuffer.writeFloatLE(viewMatrix[2][0], 0x18);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][1], 0x1C);
    viewMatrixBuffer.writeFloatLE(viewMatrix[2][2], 0x20);

    setPosition(x, y, z);
    memory.writeData(cameraPtr + 0x14, viewMatrixBuffer, viewMatrixBuffer.byteLength);
  };

  const disableInstructions = () => {
    memory.writeData(cameraInstructionsPtr, offsets[game.client].camera.fix, offsets[game.client].camera.fix.byteLength);
  };

  const disableViewMatrixUpdate = () => {
    if (game.client === 'vanilla') {
      memory.writeData(cameraViewMatrixInstructionsPtr, offsets[game.client].cameraViewMatrix.fix, offsets[game.client].cameraViewMatrix.fix.byteLength);
    }
  };

  const enableViewMatrixUpdate = () => {
    if (game.client === 'vanilla') {
      memory.writeData(cameraViewMatrixInstructionsPtr, offsets[game.client].cameraViewMatrix.pattern, offsets[game.client].cameraViewMatrix.pattern.byteLength);
    }
  };

  const enableInstructions = () => {
    memory.writeData(cameraInstructionsPtr, offsets[game.client].camera.pattern, offsets[game.client].camera.pattern.byteLength);
  };

  const enableSpectator = () => {

    disableInstructions();

    isSpectatorEnabled = false;
    spectatorInterval  = setInterval(() => {
      if (robot.Window.getActive().getTitle() !== 'World of Warcraft') {
        return; // only move the camera if the active window is the game window
      }

      getCameraData();
      const state = Mouse.getState();
      if (Keyboard.getState(robot.KEY_W) || (state[robot.BUTTON_LEFT] && state[robot.BUTTON_RIGHT])) {
        const x = camera.position.x + camera.forward.x * speed;
        const y = camera.position.y + camera.forward.y * speed;
        const z = camera.position.z + camera.forward.z * speed;
        return setPosition(x, y, z);
      }
      if (Keyboard.getState(robot.KEY_S)) {
        const x = camera.position.x - camera.forward.x * speed;
        const y = camera.position.y - camera.forward.y * speed;
        const z = camera.position.z - camera.forward.z * speed;
        return setPosition(x, y, z);
      }
      if (Keyboard.getState(robot.KEY_SPACE)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z + speed;
        return setPosition(x, y, z);
      }
      if (Keyboard.getState(robot.KEY_LCONTROL)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z - speed;
        return setPosition(x, y, z);
      }
    }, 0);
  };

  const disableSpectator = () => {
    enableInstructions();
    isSpectatorEnabled = true;
    clearInterval(spectatorInterval);
  };

  const toggleCamera = () => {
    if (isSpectatorEnabled) {
      enableSpectator();
    } else {
      disableSpectator();
    }
  };

  let currTime = new Date();

  const shouldNotify = () => {
    const now = new Date().getTime();
    if (now > currTime.getTime() + 300) {
      currTime = new Date();
      return true;
    }
  };

  const shoulEnableCamera = () => Keyboard.getState(robot.KEY_F3) && shouldNotify()  && cinematicCbListener;
  const shouldAddKeyFrame = () => Keyboard.getState(robot.KEY_F4) && shouldNotify() && cinematicCbListener;
  const shouldPlayCinematic = () => Keyboard.getState(robot.KEY_F5) && shouldNotify()  && cinematicCbListener;
  const shouldClearCinematic = () => Keyboard.getState(robot.KEY_F6) && shouldNotify()  && cinematicCbListener;

  const enableCinematicMode = () => {
    if (!isSpectatorEnabled) return;
    isCinematicModeEnabled = true;
    if (cinematicCbListener) cinematicCbListener('START_CAPTURING');
    cinematicModeInterval = setInterval(() => {
      if (shoulEnableCamera()) return toggleCamera();
      if (shouldAddKeyFrame()) return cinematicCbListener('ADD_KEYFRAME');
      if (shouldPlayCinematic()) return cinematicCbListener('PLAY');
      if (shouldClearCinematic()) return cinematicCbListener('CLEAR');
    }, 0);
  };

  const disableCinematicMode = () => {
    cinematicCbListener = false;
    isCinematicModeEnabled = false;
    clearInterval(cinematicModeInterval);
  };

  const disableSpectatorMode = () => {
    if (isSpectatorEnabled === false) {
      isSpectatorEnabled = true;
      clearInterval(spectatorInterval);
    }
  };

  const setCameraView = (view) => {
    const { x, y, z } = view;
    const matrix = [
      [view.viewMatrix00, view.viewMatrix01, view.viewMatrix02],
      [view.viewMatrix10, view.viewMatrix11, view.viewMatrix12],
      [view.viewMatrix20, view.viewMatrix21, view.viewMatrix22]
    ];
    setViewMatrix(x, y, z, matrix);
  };

  return {
    enableViewMatrixUpdate,
    disableViewMatrixUpdate,
    disableCinematicMode,
    disableSpectatorMode,
    enableSpectator,
    enableCinematicMode,
    toggleCamera,
    isSpectatorEnabled,
    setSpeed: (newSpeed) => speed = Number(newSpeed),
    setPosition: (data) => {
      setPosition(data.x, data.y, data.z);
    },
    getViewMatrix: () => getCameraData().viewMatrix,
    getView: () => getCameraData(),
    toggleCinematicBuilder: () => {
      if (isCinematicModeEnabled) return disableCinematicMode();
      enableCinematicMode();
    },
    addCinematicListener: (cb) => (cinematicCbListener = cb),
    setCameraView,
  };
};
