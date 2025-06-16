const { body, validationResult } = require('express-validator')
const ErrorHandler = require('../utils/ErrorHandler')

class Validation {

    val = [
        body("email").isEmpty().withMessage("Email is required")
            .isEmail().withMessage("Provide a valid message"),
        (req, res, next) => {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                const [err] = error.array()
                return next(new ErrorHandler(err.msg, 401))
            }
            next()
        }
    ]
}