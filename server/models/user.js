import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    name: String,
    username: { type: String, unique: true},
    password: { type: String},
    email: { type: String, unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created_at: Date,
    updated_at: Date,
    role: { type: String, required: true },

},{ versionKey: false })

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", userSchema); 