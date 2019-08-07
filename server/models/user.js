import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    name: String,
    username: { type: String, unique: true},
    password: { type: String},
    email: { type: String, unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    joined: { type: Date, required: true, default: Date.now},
    games_bought: { type: Number, required: true, default: 0},
    money_spent: { type: Number, required: true, default: 0},
    role: { type: String, required: true },

},{ versionKey: false })

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", userSchema); 