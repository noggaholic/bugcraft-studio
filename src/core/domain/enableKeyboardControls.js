const Robot = require('robot-js');
const Keyboard = Robot.Keyboard;
const Mouse = Robot.Mouse;

function EnableKeyboardControls(Game, EnableSpectate, EnableViewMatrixUpdate, GetCameraData, SetPosition) {
  return (CameraStruct, speed) => {

    const {
      Pointer,
      InstructionPointer,
      ViewMatrixInstructionsPointer,
    } = CameraStruct;

    if (!(Game.client === 'vanilla') && !(Game.client === 'alpha')) return EnableSpectate(CameraStruct, Pointer);

    EnableSpectate(InstructionPointer);
    EnableViewMatrixUpdate(ViewMatrixInstructionsPointer);
    return setInterval(() => {
      if (Robot.Window.getActive().getTitle() !== 'World of Warcraft') {
        return; // only move the camera if the active window is the game window
      }

      const camera = GetCameraData(Pointer);
      const state = Mouse.getState();
      if (Keyboard.getState(Robot.KEY_W) || (state[Robot.BUTTON_LEFT] && state[Robot.BUTTON_RIGHT])) {
        const x = camera.position.x + camera.yaw.x * speed;
        const y = camera.position.y + camera.yaw.y * speed;
        const z = camera.position.z + camera.yaw.z * speed;
        return SetPosition(Pointer, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_S)) {
        const x = camera.position.x - camera.yaw.x * speed;
        const y = camera.position.y - camera.yaw.y * speed;
        const z = camera.position.z - camera.yaw.z * speed;
        return SetPosition(Pointer, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_SPACE)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z + speed;
        return SetPosition(Pointer, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_LCONTROL)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z - speed;
        return SetPosition(Pointer, x, y, z);
      }
    }, 0);
  };
}

module.exports = EnableKeyboardControls;
