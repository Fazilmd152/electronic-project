const asyncError = require('../middlewares/asyncError')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')
const Utilities = require('../utils/Utilities')
const util = new Utilities()

/****
Create user (post)  - api/auth/create
****/
exports.createUser = asyncError(async (req, res, next) => {
    const { name, userName, email, password } = req.body
   
    const user = await User.create({
        name, email,
        userName, password,
        role: req.body.role || 'user'
    })
    if (!user)
        return next(new ErrorHandler("User cretion failed, try again later", 401))
    util.sendCookies(res, user)
})

/****
Login user (post)  - api/auth/login
****/
exports.login = asyncError(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!email) next(new ErrorHandler("Invalid Email or Password", 404))
    if (!await user.isValidPassword(password))
        next(new ErrorHandler("Invalid Email or Password", 404))
    util.sendCookies(res, user)
})

/****
Log out (get)  - api/auth/logout
****/
exports.logout = asyncError(async (req, res, next) => {
    res.status(200).cookie('auth', null, { maxAge: 0 }).json({
        success: true,
        message: "Logged out succesfully"
    })
})