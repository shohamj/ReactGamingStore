import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    author: { type: String, required: true},
    image: { type: String, required: true},
    text: { type: String, required: true},
    title: { type: String, required: true},
    categories: { type: [String], required: true},
    date: { type: Date, required: true, default: Date.now},
},{ versionKey: false })

module.exports = mongoose.model("Posts", postSchema); 