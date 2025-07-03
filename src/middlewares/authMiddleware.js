const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ErrorHandler = require('./ErrorHandler')

class Auth {
    constructor() { }

    async isAuthenticated(req, res, next) {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer'))
            return next(new ErrorHandler("No token provided", 401))

        const token = authHeader.split(" ")[1]

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            return next(new ErrorHandler("Invlaid token, login brfore to use this resource"))
        }

    }

    authorizeRoles(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler(`Access denied for role: ${req.user.role}`, 403))
            }
            next()
        }
    }

}

module.exports=new Auth()