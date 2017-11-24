var mongoose = require('mongoose');
var mongo_url = process.env.MONGO_URL || 'mongodb://ten:57017/resultdb'
var db = mongoose.connect(mongo_url, {useMongoClient: true});
mongoose.Promise = global.Promise;
mongoose.set('debug', true)

db.on('connected', function () {
  console.log('mongoose connected successfully')
})
module.exports = db