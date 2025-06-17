const { config } = require("dotenv")

config()

class Utilities {
    constructor() { }

    async sendCookies(res, user) {
        const token = await user.getJwtToken()
        const options = {
            maxAge: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        }
        
        const {password,...rest}=user.toObject()

        res.status(200).cookie('auth', token, options).json({
            success: true,
            user:rest
        })
    }
}

module.exports=Utilities