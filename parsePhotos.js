var join = require('path').join;
var fs = require('fs');

module.exports = function (path, callback) {
  var paths = []
  fs.readdir(path, function (err, files) {
    files.forEach(function (file) {
      // console.log('files', join(path, file));
      paths.push(join(path, file))
    });
    callback(null, paths)
  })
}