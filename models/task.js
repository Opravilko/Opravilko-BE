let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    due_date: {
      type: Date,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    description: {
      type: String
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    users_assigned: [{
      type: String,
      required: true
    }]
  });

  
module.exports = mongoose.model('Task', taskSchema);
