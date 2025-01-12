const mongoose = require('mongoose')

const cnSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        cn_name: { type: String },
        description: { type: String },
        location: { type: String },
        imgUrl: { type: String },
    },
    {
        timestamps:true
    }
)

const Cn = mongoose.model("Cn",cnSchema)

module.exports = Cn