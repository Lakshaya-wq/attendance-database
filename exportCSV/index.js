const { spawnSync } = require('child_process');
const { writeFileSync } = require('fs');

module.exports = function(filePath, outPath, table) {
    return new Promise((resolve, reject) => {
        var value = spawnSync('sqlite3', ['-header', '-csv', filePath, `select * from ${table};`]);
        if (value.error) {
            reject(value.error);
        } else {
            try {
                writeFileSync(outPath, value.stdout.toString());
                resolve(`File written to ${filePath}`);
            } catch (e) {
                reject(e);
            }
        }
    });
}