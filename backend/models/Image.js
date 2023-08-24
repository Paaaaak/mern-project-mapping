const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
    {
        image: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Image', ImageSchema);
