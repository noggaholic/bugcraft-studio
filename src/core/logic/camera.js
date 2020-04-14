/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks,no-multi-spaces,key-spacing,comma-dangle,max-len,no-mixed-operators */

const robot = require('robot-js');
const Keyboard = robot.Keyboard;
const Mouse = robot.Mouse;
const clonedeep = require('lodash.clonedeep');

module.exports = (GetCameraPtr, EnableSpectate, DisableSpectate, EnableViewMatrixUpdate, DisableViewMatrixUpdate) => {
  let speed = 0.60;
  const cameraStructureSize = 0x48;
  const buffer     = new Buffer(cameraStructureSize);
  const position   = new Buffer(0xC);
  const viewMatrixBuffer = new Buffer(0x24);
  const GAME_WINDOW_TITLE = 'World of Warcraft';
  return (game, memory, offsets) => {
    const { Pointer, InstructionPointer, ViewMatrixInstructionsPointer } = GetCameraPtr(game, memory, offsets);
    let spectatorInterval  = null;

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
      FarClip:  0,
      Aspect:   0
    };
  
    /**
     * Thanks to https://stackoverflow.com/questions/11338470/how-can-i-move-a-transform-in-the-forward-direction
     * for helping me to understand this shit.
     */
    const getCameraData = () => {
      memory.readData(Pointer, buffer, cameraStructureSize);
  
      camera.position.x = buffer.readFloatLE(0x8);
      camera.position.y = buffer.readFloatLE(0xC);
      camera.position.z = buffer.readFloatLE(0x10);
  
      camera.viewMatrix[0][0] = buffer.readFloatLE(0x14);
      camera.viewMatrix[0][1] = buffer.readFloatLE(0x18);
      camera.viewMatrix[0][2] = buffer.readFloatLE(0x1C);
  
      camera.viewMatrix[1][0] = buffer.readFloatLE(0x20);
      camera.viewMatrix[1][1] = buffer.readFloatLE(0x24);
      camera.viewMatrix[1][2] = buffer.readFloatLE(0x28);
  
      camera.viewMatrix[2][0] = buffer.readFloatLE(0x2C);
      camera.viewMatrix[2][1] = buffer.readFloatLE(0x30);
      camera.viewMatrix[2][2] = buffer.readFloatLE(0x34);
  
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
  
      camera.Fov      = buffer.readFloatLE(0x38);
      camera.NearClip = buffer.readFloatLE(0x3C);
      camera.FarClip  = buffer.readFloatLE(0x40);
      camera.Aspect   = buffer.readFloatLE(0x44);
      return clonedeep(camera);
    };
  
    const setPosition = (x, y, z) => {
      position.writeFloatLE(x, 0x0);
      position.writeFloatLE(y, 0x4);
      position.writeFloatLE(z, 0x8);
      memory.writeData(Pointer + 0x8, position, 0xC);
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
      memory.writeData(Pointer + 0x14, viewMatrixBuffer, viewMatrixBuffer.byteLength);
    };
  
    const disableInstructions = () => {
      memory.writeData(InstructionPointer, offsets[game.client].camera.fix, offsets[game.client].camera.fix.byteLength);
    };
  
    const disableViewMatrixUpdate = () => {
      if (game.client === 'vanilla' || game.client === 'alpha') {
        memory.writeData(ViewMatrixInstructionsPointer, 
          offsets[game.client].cameraViewMatrix.version[game.build].fix, 
          offsets[game.client].cameraViewMatrix.version[game.build].fix.byteLength
          );
      }
    };
  
    const enableViewMatrixUpdate = () => {
      if (game.client === 'vanilla' || game.client === 'alpha') {
        memory.writeData(ViewMatrixInstructionsPointer, 
          offsets[game.client].cameraViewMatrix.version[game.build].pattern, 
          offsets[game.client].cameraViewMatrix.version[game.build].pattern.byteLength
          );
      }
    };
  
    const enableInstructions = () => {
      memory.writeData(InstructionPointer, offsets[game.client].camera.pattern, offsets[game.client].camera.pattern.byteLength);
    };
  
    const enableSpectator = () => {
  
      disableInstructions();
      enableViewMatrixUpdate();
      spectatorInterval  = setInterval(() => {
        
        if (robot.Window.getActive().getTitle() !== GAME_WINDOW_TITLE) {
          return; // only move the camera if the active window is the game window
        }
  
        getCameraData();
        const state = Mouse.getState();
        if (Keyboard.getState(robot.KEY_W) || (state[robot.BUTTON_LEFT] && state[robot.BUTTON_RIGHT])) {
          const x = camera.position.x + camera.yaw.x * speed;
          const y = camera.position.y + camera.yaw.y * speed;
          const z = camera.position.z + camera.yaw.z * speed;
          return setPosition(x, y, z);
        }
        if (Keyboard.getState(robot.KEY_S)) {
          const x = camera.position.x - camera.yaw.x * speed;
          const y = camera.position.y - camera.yaw.y * speed;
          const z = camera.position.z - camera.yaw.z * speed;
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
      clearInterval(spectatorInterval);
      enableInstructions();
      enableViewMatrixUpdate();
    };
  
    const disableSpectatorMode = () => {
      clearInterval(spectatorInterval);
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
      disableSpectatorMode,
      disableSpectator,
      enableSpectator,
      setSpeed: (newSpeed) => speed = Number(newSpeed),
      setPosition: (data) => {
        setPosition(data.x, data.y, data.z);
      },
      getViewMatrix: () => getCameraData().viewMatrix,
      getView: () => getCameraData(),
      setCameraView,
    };
  };
};

/**
 * TODO: Add a button to shake the camera like this https://www.youtube.com/watch?v=JNOxz9paA6E
 */
