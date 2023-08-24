const multer = require('multer');
const router = require('express').Router();
const Image = require('../models/Image');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
    const image = new Image({
        image: {
            data: req.file.buffer,
            type: req.file.mimetype
        }
    });
    await image.save();
    res.send('success');
});

// get all images in database
router.get('/', async (req, res) => {
    try {
        const images = [];
        for await (const image of Image.find()) {
            console.log(image);
            images.push(image);
        }
        res.status(200).json(images);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;