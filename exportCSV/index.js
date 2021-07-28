const { execSync } = require('child_process');

module.exports = function(filePath, table, standard) {
    return new Promise((resolve, reject) => {
        try {
            var exported = execSync(`sqlite3 -header -csv ${filePath} "select * from ${table} where class=\\"${standard.toUpperCase()}\\";"`);
            resolve(exported.toString());
        } catch (e) {
            reject(e.message);
        }
    })
}