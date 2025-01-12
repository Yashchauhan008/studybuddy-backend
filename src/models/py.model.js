const mongoose = require('mongoose');

const pySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        py_name: { type: String },
        description: { type: String },
        location: { type: String },
        imgUrl: { type: String },
    },
    {timestamps:true}
)

const Py = mongoose.model("py",pySchema)

module.exports = Py