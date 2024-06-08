const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
