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
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    users_assigned: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }]
  });

  
let Task = mongoose.model('Task', taskSchema);

module.exports = { Task };