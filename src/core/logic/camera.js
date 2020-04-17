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
  return () => {
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
      setSpeed: (newSpeed) => {
        speed = Number(newSpeed);
        if (spectatorInterval) enableSpectator();
      },
      setPosition: (data) => SetPosition(Pointer, data.x, data.y, data.z),
      getViewMatrix: () => GetCameraData(Pointer).viewMatrix,
      getView: () => GetCameraData(Pointer),
      SetCameraView: (cinematicValues) => SetCameraView(CameraStruct, cinematicValues),
    };
  };
};
