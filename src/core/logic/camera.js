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
  SetCameraView
) => {
  return (game, memory, offsets) => {
    const {
      Pointer,
      InstructionPointer,
      ViewMatrixInstructionsPointer
    } = GetCametaPtr(game, memory, offsets);

    let spectatorInterval = null;
    let speed = 0.375;

    const disableSpectator = () => {
      clearInterval(spectatorInterval);
      DisableSpectate(InstructionPointer);
      EnableViewMatrixUpdate(ViewMatrixInstructionsPointer);
    };

    const disableSpectatorMode = () => {
      clearInterval(spectatorInterval);
    };

    function enableSpectator() {
      if (spectatorInterval) clearInterval(spectatorInterval);
      spectatorInterval = EnableKeyboardControls(Pointer, InstructionPointer, ViewMatrixInstructionsPointer, speed);
    }

    return {
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
      SetCameraView: (cinematicValues) => SetCameraView(Pointer, cinematicValues),
    };
  };
};
