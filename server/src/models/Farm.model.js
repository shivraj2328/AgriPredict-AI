const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

    name: {
        type: String,
        required: true,
        trim: true
    },

    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },

    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },

    description: {
        type: String,
        trim: true,
        default: ""
    }
},
{
    timestamps: true
}

);

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;