const Mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { config } = require('dotenv')
const { default: mongoose } = require('mongoose')
config()

const userSchema = Mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    userName: {
        type: String,
        required: [true, "Please provide username"]
    },
    phone: {
        type: String,
        required: [true, "Please provide phone number"],
        validate: [(val) => validator.isMobilePhone(val, 'en-IN'), "Enter valid mobile phone number"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Provide a valid Email"],
        unique: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: [true, "Provide your password"],
        select: false
    },
    profileImg: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'user'],
        required: [true, "Please provide a valid role"],
        default: 'user'
    },
    resetPassswordToken: String,
    resetPasswordTokenExpire: Date,
    otp: String,
    otpDetails: String,
    otpExpire: Date
}, { timeStamps: true })


//------hash password-------\\
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 11)
})


//----Validate pasword-----\\
userSchema.methods.isValidPassword = async (enteredPassword) => {
    const isvalid = await bcrypt.compare(enteredPassword, this.password)
    return isvalid
}


//----Generate jwt token------\\
userSchema.methods.getJwtToken = () => {
    jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}


const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel