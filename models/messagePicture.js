//!--OPTIONAL--!
/*
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
  created_at: {
    type: Date,
    required: true
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userTo: {
    type: Schema.Types.ObjectId,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);*/