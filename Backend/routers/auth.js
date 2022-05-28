const express = require("express")
const router = express.Router()
const User = require('../modules/User')
const { body, validationResult } = require('express-validator');
const { findOne } = require("../modules/User");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userDeatails = require("../middleware/userDetails");


const JWT_SECRET = "matkarohackingy@@r"


// const JWT_SECRET = "Harryiswo%nde*"

// Route-1 : Creating a user using POST in localhost:5000/api/auth/createuser. No login required.
router.post('/createuser', [
    // Validations
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 4 })
], async (req, res) => {

    let success = false;
    //Send error messege if any error occurred
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ success, errors: errors.array() });
    }


    //Try catch block for creating a new user
    try {
        //Check whether user with this email is already exist or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ erorr: "Sorry please enter a valid email" })
        }

        const salt = await bcryptjs.genSalt(10)
        const secPass = await bcryptjs.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const jwtData = jwt.sign(data, JWT_SECRET);
        res.send({ user, success, jwtData })

    } catch (error) {
        console.log(error)
        res.send({ "msg": "Some error occurred" })
    }



})
// Route-2 : Creating a login end-point using POST method on localhost:5000/api/auth/login. Authentication required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid name').exists()
], async (req, res) => {
    //Send error messege if any error occurred
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }


    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });

        //If email is invalid or not fetched from database then send the bad request
        if (!user) {
            return res.status(400).json({ erorr: "Wrong email or password" })
        }

        // compare the user password with user entered password using comapre method
        const passCompare = await bcryptjs.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json({ success, erorr: "Wrong email or password" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const jwtData = jwt.sign(data, JWT_SECRET);
        res.send({ user, success, jwtData })


    } catch (error) {
        console.log(error)
        res.send({ "msg": "Some error occurred" })
    }

})


//ROUTE 3 : Get logged in user's deatails using POST on localhost:5000/api/getuser . Logged in required
router.post('/details', userDeatails, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        res.status(500).send({ "error": "Internal server error occurred" })
    }
})

module.exports = router