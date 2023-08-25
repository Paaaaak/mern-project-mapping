const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Image', ImageSchema);
