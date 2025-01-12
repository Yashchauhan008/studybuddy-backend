const mongoose = require('mongoose')

const csSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        cs_name: { type: String },
        description: { type: String },
        location: { type: String },
        imgUrl: { type: String },
    },
    {
        timestamps:true
    }
);

const Cs = mongoose.model("Cs",csSchema)

module.exports = Cs