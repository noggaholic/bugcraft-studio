function GetCameraPtr(Game, memory, Module, offsets) {
    return () => {
      if (Game.client === 'alpha' || Game.client === 'vanilla') {
        const InstructionPointer = memory.find(offsets[Game.client].camera.position[Game.build].pattern.toString('hex'), 0, -1, 1, '-x')[0];
        const instructionBase = offsets[Game.client].camera.base;
        const ptrFix = offsets[Game.client].camera.base.version[Game.build].ptrFix;
        let Pointer = memory.resolvePtrBySetOfInstruction(instructionBase, Game.build, ptrFix);
        /**
         * Move this somewhere
        */
        if (Game.client === 'alpha') {
          Pointer += 0xC4;
        }

        if (!Pointer) {
          throw new Error('Can\'t find camera');
        }

        console.log('# Camera PTR found at', `0x${(Pointer || 0).toString(16)}`);

        return {
          Pointer,
          InstructionPointer,
          SpectatePointer: null,
          CameraValuesPointer: null,
        };
      } else if (offsets[Game.client].base) {
        const SpectatePointerFinder = offsets[Game.client].base.version[Game.build].SpectatePointer;
        const SpectatePointer = Array.isArray(SpectatePointerFinder) ? memory.readMultiLevelPtr(SpectatePointerFinder) : SpectatePointerFinder;
        const Pointer = memory.readMultiLevelPtr(offsets[Game.client].base.version[Game.build].CameraPointer);
        const CameraValuesPointer = Module + offsets[Game.client].base.version[Game.build].CameraValuesPointer;

        console.log('# Camera SpectatePointer found at', `0x${SpectatePointer.toString(16)}
        - Camera spectate values at: 0x${CameraValuesPointer.toString(16)}
        - Camera values at: 0x${Pointer.toString(16)}`);
        return {
          Pointer,
          InstructionPointer: null,

          SpectatePointer,
          CameraValuesPointer,
        };
      } else {
        const SpectatePointerFinder = offsets[Game.client].SpectatePointer;
        const SpectatePointer = Array.isArray(SpectatePointerFinder) ? memory.readMultiLevelPtr(SpectatePointerFinder) : SpectatePointerFinder;
        const Pointer = memory.readMultiLevelPtr(offsets[Game.client].CameraPointer);
        let CameraValuesPointer;
        if (offsets[Game.client].CameraValuesPointer.module) {
          CameraValuesPointer = Module + offsets[Game.client].CameraValuesPointer.offset;
        } else {
          CameraValuesPointer = offsets[Game.client].CameraValuesPointer;
        }

        console.log('# Camera SpectatePointer found at', `0x${(SpectatePointer || 0).toString(16)}
        - Camera spectate values at: 0x${(CameraValuesPointer || 0).toString(16)}
        - Camera values at: 0x${(Pointer || 0).toString(16)}`);
        return {
          Pointer,
          InstructionPointer: null,

          SpectatePointer,
          CameraValuesPointer,
        };
      }
    };
}

module.exports = GetCameraPtr;
