const router = require('express').Router();
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    try {
        console.log('File info:', req.file);
        const image = {
            userId: req.body.userId,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: 'image/png'
            }
        }
        Image.create(image).then((error, item) => {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200).json(item);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

// // get a certain image by image ID
// router.get('/:id', async (req, res) => {
//     try {
//         const image = await Image.findById(req.params.id);
//         if (!image) {
//             return res.status(400).send('Image not found.');
//         }
//         console.log('Image data', image);
//         res.set('Content-Type', image.image.type);
//         res.send(image.image.data);
//     }
//     catch (error) {
//         res.status(500).json(error);
//     }
// });


// // get all images in database
// router.get('/', async (req, res) => {
//     try {
//         const images = [];
//         for await (const image of Image.find()) {
//             console.log(image);
//             images.push(image);
//         }
//         res.status(200).json(images);
//     }
//     catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;