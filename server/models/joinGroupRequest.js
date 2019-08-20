import mongoose from 'mongoose';

const joinGroupRequestSchema = mongoose.Schema({
    groupName: { type: String, required: true},
    groupId: { type: mongoose.Schema.Types.ObjectId, required: true},
    userImage: { type: String, required: true},
    userName: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true},
    requested: { type: Date, required: true, default: Date.now},
    status: { type: String, required: true, default: "Pending"},
},{ versionKey: false })

module.exports = mongoose.model("JoinGroupRequest", joinGroupRequestSchema); 