const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imgUrl: { type: String },
    likes: { type: Number, default: 0 },
    question:{ type:Number ,default:0},
    cheatsheet:{type:String},
    lastOpen: { type: Date },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
