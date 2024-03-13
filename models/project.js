let mongoose = require('mongoose');

let Schema = mongoose.Schema;
  
let projectSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

let Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
