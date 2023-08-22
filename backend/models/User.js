const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
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
        },
        color: {
            type: String, 
            require: false,
            min: 6
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        friendPins: {
            type: Array,
            default: []
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);