const mongoose = require('mongoose')

const taSchema = new mongoose.Schema({
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    degree:{type:String},
    semester:{type:Boolean},
  }, { timestamps: true });

  const Ta = mongoose.model('Ta',taSchema);

  module.exports = Ta ;