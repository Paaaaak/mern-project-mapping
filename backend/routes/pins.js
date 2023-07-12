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

// get all pins
router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;