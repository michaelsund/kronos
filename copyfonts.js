const fs = require("fs-extra");

const isWin = /^win/.test(process.platform);
let path;

if (isWin) {
  path = 'release/Kronos-win32-x64/fonts'
  console.log('Windows system');
}

console.log('Copying font files to release');
try {
  fs.copy("fonts", path);
} catch (e) {
  console.log(e);
} finally {
  console.log('Done');
}
