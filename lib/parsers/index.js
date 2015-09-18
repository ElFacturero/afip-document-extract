require('fs').readdirSync(__dirname + '/').forEach(function (file) {
  if (file.match(/parser-(.+)\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '').replace('parser-', '')
    exports[name] = require('./' + file)
  }
})
