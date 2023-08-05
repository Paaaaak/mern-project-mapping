const router = require('express').Router();
const Pin = require('../models/Pin');

// create a pin
router.post('/', async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        // async와 await 사용하지 않을 시 저장되는 시점 전에 반환하는 savedPin 변수가 undefined일 수도 있기 때문에 선언 
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// get all pins by user id
router.get('/:userId', async (req, res) => {
    try {
        const pins = await Pin.find({userId: req.params.userId})
        res.status(200).json(pins);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// delete a pin
router.get('/delete/:pinId', async (req, res) => {
    try {
        const pinId = req.params.pinId;
        const deletedPin = await Pin.findByIdAndDelete(pinId);
        res.status(200).json(deletedPin);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update pin information
router.put('/update/:pinId', async (req, res) => {
    try {
        const pinId = req.params.pinId;
        const updatedPin = await Pin.findByIdAndUpdate({ _id: pinId }, req.body);
        if (!updatedPin) {
            return res.status(400).json('Pin is not found!');
        }
        res.status(200).json(updatedPin);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update certain user's pins information
router.put('/:userId', async (req, res) => {
    try {
        const updatedPin = await Pin.updateMany({ userId: req.params.userId }, req.body);
        if (!updatedPin) {
            return res.status(400).json('Pin is not found!');
        }
        res.status(200).json(updatedPin);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;