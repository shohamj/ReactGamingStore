import mongoose from 'mongoose';

const createChatGroupRequestSchema = mongoose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
    managerId: { type: mongoose.Schema.Types.ObjectId, required: true},
    managerName: { type: String, required: true},
    managerUsername: { type: String, required: true},
    requested: { type: Date, required: true, default: Date.now},
    status: { type: String, required: true, default: "Pending"},
},{ versionKey: false })

module.exports = mongoose.model("ChatGroupRequests", createChatGroupRequestSchema); 