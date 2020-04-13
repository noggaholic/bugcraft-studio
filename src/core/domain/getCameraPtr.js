
function GetCameraPtr() {
    return (game, memory, offsets) => {
        const InstructionPointer = memory.find(offsets[game.client].camera.pattern.toString('hex'), 0, -1, 1, '-x')[0];

        const viewMatrixFixPtr = offsets[game.client].cameraViewMatrix.version[game.build].pattern;
        const ViewMatrixInstructionsPointer = memory.find(viewMatrixFixPtr.toString('hex'), 0, -1, 1, '-x')[0];

        const instructionBase = offsets[game.client].camera.base;
        const ptrFix = offsets[game.client].camera.base.version[game.build].ptrFix;
        let Pointer = memory.resolvePtrBySetOfInstruction(instructionBase, ptrFix);

        /**
         * Move this somewhere
        */
        if (game.client === 'alpha') {
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
        };
    };
}

module.exports = GetCameraPtr;
