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
            return res.status(400).json('Wrong username or password!');
        }
        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        // if the password is not valid
        if (!validPassword) {
            return res.status(400).json('Wrong username or password!');
        }
        res.status(200).json({_id: user._id, username: user.username, color: user.color});
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// get user by username
router.post('/get', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).json('Username ' + req.body.username + ' does not exist!');
        }
        res.status(200).json({_id: user._id, username: user.username});
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update user information
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId}, req.body, {
            new: true,
            upsert: true
        });
        if (!updatedUser) {
            return res.status(400).json('User is not found!');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// follow a user
router.put('/:userId/follow', async (req, res) => {
    if (req.params.userId !== req.body.userId) {
        try {
            const userToFollow = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if (!userToFollow.followers.includes(req.body.userId)) {
                await userToFollow.updateOne({ "$push": { "followers": req.body.userId }})
                await currentUser.updateOne({ "$push": { "followings": req.params.userId } })
                res.status(200).json(userToFollow);
            }
            else {
                return res.status(403).json('You are already following this user!');
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json('You cannot follow yourself!');
    }
});

// unfollow a user
router.put('/:userId/unfollow', async (req, res) => {
    if (req.params.userId !== req.body.userId) {
        try {
            const userToUnfollow = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);
            if (userToUnfollow.followers.includes(req.body.userId)) {
                await userToUnfollow.updateOne({ "$pull": { "followers": req.body.userId }})
                await currentUser.updateOne({ "$pull": { "followings": req.params.userId } })
                res.status(200).json(userToUnfollow);
            }
            else {
                return res.status(403).json('You are not following this user!');
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json('You cannot unfollow yourself!');
    }
});

// get all followings
router.get('/:userId/followings', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log(user);
        if (user) {
            const followings = [];
            for (let i = 0; i < user.followings.length; i++) {
                const f1 = await User.findById(user.followings[i]);
                console.log(f1);
                followings.push(f1);
            }
            return res.status(200).json(followings);
        }
        res.status(400).json('User not found!');
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;