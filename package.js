const fs = require('fs');
const packager = require('electron-packager');

const pkg = {
  name: 'Kronos',
  productName: 'Kronos',
  version: '1.0.0',
  main: 'main.js'
}

fs.writeFile('./build/package.json', JSON.stringify(pkg), function(err) {
    if(err) {
      console.log(err);
    } else {
      packager({
        dir: './build',
        arch: 'x64', // ia32, x64, all
        platform: 'linux', // linux, win32, darwin, mas, all
        // 'app-copyright': '',
        // 'app-version': pkg.version,
        prune: false,
        out: './release'
      }, function(err){
        if (err) console.error(err);
      });
    }
});
