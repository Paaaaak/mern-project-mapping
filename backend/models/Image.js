const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
    {
        image: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Image', ImageSchema);
