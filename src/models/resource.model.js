const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true }, // Replaces `py_name` and `srs_name`
    description: { type: String },
    location: { type: String },
    imgUrl: { type: String },
    resource: { type: String, required: true }, // Resource type as a string (e.g., "Srs", "Py")
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
