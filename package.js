const fs = require('fs');
const fse = require('fs-extra');
const packager = require('electron-packager');

const targetSystem = 'darwin' // linux, win32, darwin, mas, all
const pkg = {
  name: 'Kronos',
  productName: 'Kronos',
  version: '1.0.0',
  main: 'main.js'
}

function writePackage(_callback) {
  fs.writeFile('./build/package.json', JSON.stringify(pkg), function(err) {
      if (err) {
        console.log(err);
      } else {
        packager({
          dir: './build',
          arch: 'x64', // ia32, x64, all
          platform: targetSystem,
          prune: false,
          out: './release',
          overwrite: true
        }, function() {
          _callback();
        });
      }
  });
}

function copyFonts() {
  writePackage(function() {
    let path;
    switch (targetSystem) {
      case 'darwin':
        path = 'release/Kronos-darwin-x64/Kronos.app/Contents/Resources/app/fonts'
        break;
      case 'win32':
        path = 'release/Kronos-win32-x64/resources/app/fonts'
        break;
      case 'linux':
        path = 'release/Kronos-linux-x64/'
        break;
      default:
    }

    try {
      fse.copy('fonts', path);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('Done copying fonts');
    }
  });
}

copyFonts();
