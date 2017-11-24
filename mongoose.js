var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://ten:57017/resultdb', {useMongoClient: true});
mongoose.Promise = global.Promise;
mongoose.set('debug', true)

db.on('connected', function () {
  console.log('mongoose connected successfully')
})
module.exports = db