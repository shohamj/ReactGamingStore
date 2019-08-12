import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true},
    gameID: { type: mongoose.Schema.Types.ObjectId, required: true},
    user: { type: String, required: true},
    game: { type: String, required: true},
    price: { type: Number, required: true},
    amount: { type: Number, required: true},
    status: { type: String, required: true},   
    ordered: { type: Date, required: true, default: Date.now},
},{ versionKey: false })

module.exports = mongoose.model("Orders", orderSchema); 