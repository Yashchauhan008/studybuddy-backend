const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  question: { type: String, required: true },
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard", "important"],
    default: "easy",
  },
  isPrivate:{type:Boolean},
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  codes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Code" }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
