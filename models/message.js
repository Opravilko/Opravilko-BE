let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

let Message = mongoose.model('Message', messageSchema);

module.exports = { Message };