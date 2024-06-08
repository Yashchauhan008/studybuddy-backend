const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    description:{type:String,required:true},
    language: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;