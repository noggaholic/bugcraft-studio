/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks,no-multi-spaces,key-spacing,comma-dangle,max-len,no-mixed-operators */

/**
 * Add a button to shake the camera like this https://www.youtube.com/watch?v=JNOxz9paA6E
 */

module.exports = (
  GetCametaPtr,
  DisableSpectate,
  EnableViewMatrixUpdate,
  DisableViewMatrixUpdate,
  GetCameraData,
  EnableKeyboardControls,
  SetPosition,
  SetCameraView,
  SetCollision
) => {
  return (Offsets, Game, Memory) => {
    const {
      /**
       * For custom spectate controls
       */
      Pointer,
      InstructionPointer,
      ViewMatrixInstructionsPointer,
      /**
       * For in-game spectate
       */
      SpectatePointer,
      CameraValuesPointer,
    } = GetCametaPtr();

    const CameraStruct = {
      Pointer,
      InstructionPointer,
      ViewMatrixInstructionsPointer,
      SpectatePointer,
      CameraValuesPointer,
    };

    let spectatorInterval = null;
    let speed = 0.375;

    const disableSpectator = () => {
      clearInterval(spectatorInterval);
      DisableSpectate(CameraStruct);
      EnableViewMatrixUpdate(ViewMatrixInstructionsPointer);
    };

    const disableSpectatorMode = () => {
      const enableCameraFacingBuffer = new Buffer([0xD7, 0x42, 0x00, 0x00, 0x61, 0x0E, 0xC2, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00]);
      const enableCameraFacingPtr = Offsets[Game.client].enableCameraFacing;
      Memory.writeData(Pointer + enableCameraFacingPtr, enableCameraFacingBuffer, enableCameraFacingBuffer.byteLength);
      clearInterval(spectatorInterval);
    };

    function enableSpectator() {
      if (spectatorInterval) clearInterval(spectatorInterval);
      spectatorInterval = EnableKeyboardControls(CameraStruct, speed);
    }

    return {
      SetCollision: (isEnabled) => SetCollision(CameraValuesPointer, isEnabled),
      enableViewMatrixUpdate: () => EnableViewMatrixUpdate(ViewMatrixInstructionsPointer),
      disableViewMatrixUpdate: () => DisableViewMatrixUpdate(ViewMatrixInstructionsPointer),
      disableSpectatorMode,
      disableSpectator,
      enableSpectator,
      setSpeed: (newSpeed, isSpectateEnabled) => {
        speed = Number(newSpeed);
        if (isSpectateEnabled) enableSpectator();
      },
      setPosition: (data) => SetPosition(Pointer, data.x, data.y, data.z),
      getViewMatrix: () => GetCameraData(Pointer).viewMatrix,
      getView: () => GetCameraData(Pointer),
      SetCameraView: (cinematicValues) => SetCameraView(CameraStruct, cinematicValues),
    };
  };
};
