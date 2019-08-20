import mongoose from 'mongoose';

const chatMessagesSchema = mongoose.Schema({
    data: { type: String, required: true},
    dataType: { type: String, required: true},
    receiveType: { type: String, required: true},
    from: { type: mongoose.Schema.Types.ObjectId, required: true},
    to: { type: mongoose.Schema.Types.ObjectId, required: function() { return this.receiveType !== 'all'; } },
    date: { type: Date, required: true, default: Date.now},
    likes: { type: Number, required: true, default: 0},
    unlikes: { type: Number, required: true, default: 0},
    showLater: { type: Boolean, required: true, default: true}, 
},{ versionKey: false })

module.exports = mongoose.model("ChatMessages", chatMessagesSchema); 