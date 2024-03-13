let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let example = new Schema({
  'name': String,
  'path': String
});

module.exports = mongoose.model('example', example);
