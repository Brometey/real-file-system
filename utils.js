const path = require('path');
const fs = require('fs');

exports.globSync = (dir, pattern) => {
    let results = [];
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const filePath = path.join(dir, file);
        if (path.basename(filePath).match(pattern)) {
            results.push(filePath);
        }
    }
    return results;
}