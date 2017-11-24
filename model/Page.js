var db = require('../mongoose');

var collectionName = 'page'
var Page = db.model('Page', {
  "taskid": String,
  "url": String,
  "updatetime": Number,
  "result": {
    img_url: Array,
    dir_path: String,
    title: String
  }
}, collectionName);

module.exports = Page