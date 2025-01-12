const mongoose = require("mongoose");

const srsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    srs_name: { type: String },
    description: { type: String },
    location: { type: String },
    imgUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Srs = mongoose.model("srs", srsSchema);

module.exports = Srs;
