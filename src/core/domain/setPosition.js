const cameraPosition = new Buffer(0xC);

function setPosition(Game, Memory) {
  return (Pointer, x, y, z) => {
    cameraPosition.writeFloatLE(x, 0x0);
    cameraPosition.writeFloatLE(y, 0x4);
    cameraPosition.writeFloatLE(z, 0x8);

    if (Game.client === 'vanilla' || Game.client === 'alpha') {
      Memory.writeData(Pointer + 0x8, cameraPosition, 0xC);
    } else {
      Memory.writeData(Pointer + 0xC, cameraPosition, 0xC);
    }
  };
}

module.exports = setPosition;
