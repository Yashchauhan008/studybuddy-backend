const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard", "important"],
      default: "easy",
    }, // Updated to string
    code: { type: mongoose.Schema.Types.ObjectId, ref: "Code" },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;