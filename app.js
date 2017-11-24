var fs = require('fs');
var express = require('express');
var mustache = require('mustache');
var _ = require('lodash');
var app = express();
var Gallery = require('express-photo-gallery');
var parsePhotos = require('./parsePhotos');
var Result = require('./model/Result');
var Page = require('./model/Page');

var options = {
  title: 'My Awesome Photo Gallery'
};

transResultToPage()

parsePhotos('/data/images', function (err, paths) {
  // console.log('photos path', paths);
  paths.forEach(function (path) {
    var fileName = path.split('/').pop()
    console.log('register path', path);
    console.log('register fileName', fileName);
    app.use('/images/' + fileName, Gallery(path, options));
  });
  getPages().then(function (results) {
    console.log('pages', results);
    renderIndex(app, results)
    app.listen(3000);
  }).catch(function (err) {
    console.log('parse pages err', err);
  })
})

function renderIndex (app, pages) {
  var template = fs.readFileSync(__dirname + '/index.mustache').toString();
  mustache.parse(template);
  const html = mustache.render(template, {pages: pages})
  app.use('/', function (req, res) {
    res.send(html);
  })
}

function getPages () {
  return new Promise(function (resolve, reject) {
    Page.find().sort({_id: -1}).then(function (pages) {
      pages = _.filter(pages, function (page) {
        return page.result.img_url && (page.result.img_url.length > 0)
      })
      console.log('pages nums', pages.length);
      var results = []
      pages.forEach(function (page) {
        results.push({
          dir_path: page.result.dir_path,
          title: page.result.title
        })
      });
      resolve(results)
    }).catch(reject)
  })
}

function transResultToPage () {
  Result.find({trans: {$exists: false}}).then(function (results) {
    console.log('results parse', results);
    results.forEach(function (result) {
      var page = JSON.parse(result.result)
      var newPage = new Page({
        "taskid": result.taskid,
        "url": result.url,
        "updatetime": result.updatetime,
        "result": page
      })
      newPage.save().then(function (err) {
        if (err) {
          result.trans = true
          result.save()
        }
      })
    });
  })
}