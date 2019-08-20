import mongoose from 'mongoose';

const chatUsersSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
    name: { type: String, required: true},
    image: { type: String, required: true},
    isOnline: { type: Boolean, required: true, default: false},
    messages: { type: [], required: true, default: []},
},{ versionKey: false })

module.exports = mongoose.model("ChatUsers", chatUsersSchema); 