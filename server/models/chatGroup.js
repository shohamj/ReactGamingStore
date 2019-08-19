import mongoose from 'mongoose';

const chatGroupsSchema = mongoose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
    members: { type: [], required: true, default: []},
    manager: { type: mongoose.Schema.Types.ObjectId, required: true},
},{ versionKey: false })

module.exports = mongoose.model("ChatGroups", chatGroupsSchema); 