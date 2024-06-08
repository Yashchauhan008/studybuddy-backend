const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    description:{type:String,required:true},
    answer: { type: String, required: true },
    // code: { type: String, required: true },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;