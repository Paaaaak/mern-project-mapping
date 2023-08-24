const multer = require('multer');
const router = require('express').Router();
const Image = require('../models/Image');

const upload = multer({ dest: 'uploads/' });
const path = require('path');

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).send('Uploaded file is not an allowed image type.');
        }

        const image = new Image({
            image: {
                data: req.file.buffer,
                type: req.file.mimetype
            }
        });

        await image.save();
        res.send('success');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});

// get a certain image by image ID
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(400).send('Image not found.');
        }
        console.log('Image data', image);
        res.set('Content-Type', image.image.type);
        res.send(image.image.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
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