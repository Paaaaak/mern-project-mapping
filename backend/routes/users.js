const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register user
router.post('/register', async (req, res) => {
    try {
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        
        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        // find user with username
        const user = await User.findOne({username: req.body.username});
        // if there is no user corresponding to username
        if (!user) {
            res.status(400).json('Wrong username or password!');
        }

        // validate password
        const validPassword = bcrypt.compare(req.body.password, user.password);
        // if the password is not valid
        if (!validPassword) {
            res.status(400).json('Wrong username or password!');
        }

        res.status(200).json({_id: user._id, username: user.username});
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;