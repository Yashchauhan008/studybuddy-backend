const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    language: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;