const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/* Image upload */
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'profile-images');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + req.body.userId);
        // e.g. image-64ba2300d16e7fe165610c02
    },
    // Filtering file extension
    filefilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("You can upload PNG and JPG!"));
        }
        callback(null, true);
    },
    // Limits size of file to less than 1MB
    limits: {
        fileSize: 1024 * 1024,
    },
});
const upload = multer({ storage: storage});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json('No image uploaded.');
        }
        const userId = req.body.userId;
        
        // Generate a unique filename for the uploaded image
        const filename = 'image-' + userId;
        // Construct the URL to access the uploaded image
        const imageUrl = '/profile-images/' + filename; // This path depends on your server configuration

        // Update the user with the image URL
        User.findByIdAndUpdate(userId, { $set: { profileImageURL: imageUrl } }, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).send('User not found!');
                }
                return res.status(200).json({ message: 'Image uploaded successfully.', user: updatedUser });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send('An error occurred while uploading the image.');
            });
    } 
    catch (error) {
        res.status(500).send(error);
    }
});

// 이미지 이름으로 URL 요청오면 해당 이미지 보여줌
router.get("/image/:imgName", function (req, res) {
    res.sendFile(__dirname + "/../profile-images/" + req.params.imgName);
  });

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
        res.status(200).json({_id: user._id, username: user.username, color: user.color, profileImageURL: user.profileImageURL});
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
        if (user) {
            const followings = [];
            for (let i = 0; i < user.followings.length; i++) {
                const following = await User.findById(user.followings[i]);
                followings.push(following);
            }
            return res.status(200).json(followings);
        }
        res.status(400).json('User not found!');
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// add friends pins
router.put('/:userId/visible', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.body.friendId);
        if (friend) {
            if (user.friendPins.includes(req.body.friendId)) {
                res.status(403).json('It already contains the same ID: ' + req.body.friendId);
            }
            else {
                await user.updateOne({ "$push": { "friendPins": req.body.friendId }});
                res.status(200).json(user);
            }
        }
        else {
            res.status(403).json('User ID ' + req.body.friendId + ' is not found!');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// delete friends pins
router.put('/:userId/invisible', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.body.friendId);
        if (friend) {
            if (user.friendPins.includes(req.body.friendId)) {
                await user.updateOne({ "$pull": { "friendPins": req.body.friendId }});
                res.status(200).json(user);
            }
            else {
                res.status(403).json('It does not contain the following ID: ' + req.body.friendId);
            }
        }
        else {
            res.status(403).json('User ID ' + req.body.friendId + ' is not found!');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;