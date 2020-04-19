function GetCameraPtr(Game, memory, Module, offsets) {
    return () => {
      const viewMatrixFixPtr = offsets[Game.client].cameraViewMatrix.version[Game.build].pattern;
      const ViewMatrixInstructionsPointer = memory.find(viewMatrixFixPtr.toString('hex'), 0, -1, 1, '-x')[0];

      if (Game.client === 'vanilla' || Game.client === 'alpha') {
        const InstructionPointer = memory.find(offsets[Game.client].camera.pattern.toString('hex'), 0, -1, 1, '-x')[0];

        const instructionBase = offsets[Game.client].camera.base;
        const ptrFix = offsets[Game.client].camera.base.version[Game.build].ptrFix;
        let Pointer = memory.resolvePtrBySetOfInstruction(instructionBase, ptrFix);

        /**
         * Move this somewhere
        */
        if (Game.client === 'alpha') {
          Pointer += 0xC4;
        }

        if (!Pointer) {
          throw new Error('Can\'t find camera');
        }

        console.log('# Camera PTR found at', `0x${Pointer.toString(16)}`);

        return {
          Pointer,
          InstructionPointer,
          ViewMatrixInstructionsPointer,

          SpectatePointer: null,
          CameraValuesPointer: null,
        };
      }

      const SpectatePointerFinder = offsets[Game.client].SpectatePointer;
      const SpectatePointer = Array.isArray(SpectatePointerFinder) ? memory.readMultiLevelPtr(SpectatePointerFinder) : SpectatePointerFinder;
      const Pointer = memory.readMultiLevelPtr(offsets[Game.client].CameraPointer, true);
      const CameraValuesPointer = offsets[Game.client].CameraValuesPointer;

      console.log('# Camera SpectatePointer found at', `0x${SpectatePointer.toString(16)}
      - Camera spectate values at: 0x${CameraValuesPointer.toString(16)}
      - Camera values at: 0x${Pointer.toString(16)}
      - ViewMatrixInstructionsPointer: 0x${ViewMatrixInstructionsPointer.toString(16)}`);
      return {
        Pointer,
        InstructionPointer: null,
        ViewMatrixInstructionsPointer,

        SpectatePointer,
        CameraValuesPointer,
      };
    };
}

module.exports = GetCameraPtr;
