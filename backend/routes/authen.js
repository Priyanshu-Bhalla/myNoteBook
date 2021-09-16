const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "thisisthesecretjwtstring";

//ROUTE1:creating a user for /api/authen/createuser
router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Enter Valid Password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors then show the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //throw error if 2 users have same email id
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, errors: 'Sorry the user with this email already exists' });
        }
        //else create user
        var salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authenToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authenToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Some Error Occured');
    }

});

//ROUTE2: end point for user login : /api/authen/login : no login req
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    // if there are errors then show the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        //if the mail doesnt matches with any email on
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: 'Please Enter Valid Credentials' });
        }

        //comparing passwords
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false
            return res.status(400).json({ success, errors: 'Please Enter Valid Credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authenToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authenToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some Error Occured');
    }
    //if the email doesnt match with emails on db


})
//ROUTE3: for getting the data from user at POST:/api/auth/getuser , login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some Error Occured');
    }
})
module.exports = router;