const mongoose = require('mongoose');

const mlSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        ml_name: { type: String },
        description: { type: String },
        location: { type: String },
        imgUrl: { type: String },
    },
    {
        timestamps:true
    }
)

const Ml = mongoose.model("Ml",mlSchema)

module.exports = Ml