let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    pass: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    }
  });
  
let User = mongoose.model('User', userSchema);

module.exports = { User };
  