var express = require('express');
var app = express();
var Gallery = require('express-photo-gallery');
var parsePhotos = require('./parsePhotos');

var options = {
  title: 'My Awesome Photo Gallery'
};
parsePhotos(__dirname + '/photos', function (err, paths) {
  // console.log('photos path', paths);
  paths.forEach(function (path) {
    var fileName = path.split('/').pop()
    console.log('register path', path);
    console.log('register fileName', fileName);
    app.use('/photos/' + fileName, Gallery(path, options));
  });
  app.listen(3000);
})

