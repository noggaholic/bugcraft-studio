const fs = require('fs');

module.exports = (path, settings) => {
    fs.writeFileSync(path, settings);
};
