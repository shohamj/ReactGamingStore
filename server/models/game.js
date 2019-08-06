import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    mainImage: { type: String, required: true},
    description: { type: String, required: true},
    extraImages: { type: [String], required: false},
    genre: { type: [String], required: true},
    platform: { type: [String], required: true},
    sold: { type: Number, required: true, default: 0},
    released: { type: Date, required: true},
    added: { type: Date, required: true, default: Date.now},
    controller: { type: Boolean, required: true},
},{ versionKey: false })

module.exports = mongoose.model("Games", gameSchema); 