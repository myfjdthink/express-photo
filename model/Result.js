var db = require('../mongoose');

var collectionName = 't66y'
var Result = db.model('Result', {
  "taskid": String,
  "trans": Boolean,
  "url": String,
  "updatetime": Number,
  "result": String
}, collectionName);

module.exports = Result