
const initialize = require('./initialize');

const find = () => {
    initialize((err, process, module, memory, window) => {
        const cameraBasePattern = '? ? ? ? 85 C0 74 07 8B 80 ? ? ? ? C3 33 C0 C3 55 8B EC 56 57 E8 ? ? ? ?';
        const cameraBasePtrBuffer = new Buffer(4);
        const findPattern = pattern => memory.find(pattern, 0, -1, 1, '-x');
        const cameraBasePatternResult = findPattern(cameraBasePattern);
        console.log('# findPattern(pattern)', cameraBasePatternResult[0]);
        memory.readData(cameraBasePatternResult[0], cameraBasePtrBuffer, cameraBasePtrBuffer.byteLength);
        console.log('# cameraBasePtrBuffer', cameraBasePtrBuffer.toString('hex').match(/.{1,2}/g).reverse().join(''));
    });
};

module.exports = find;