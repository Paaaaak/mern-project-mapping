const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 6
        }
    },
    { timestamps: ture }
);

module.exports = mongoose.model('User', UserSchema);