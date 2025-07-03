module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'

    // Clone error object for modification
    let error = { ...err }
    error.message = err.message

    if (process.env.NODE_ENV !== 'development') {
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message)
            message = errors[0] || 'Validation error'
            statusCode = 400
        }
        else if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]
            message = `Duplicate value for field: ${field}`
            statusCode = 400
        }
        else if (err.name === 'CastError') {
            message = `Invalid ${err.path}: ${err.value}`
            statusCode = 400
        }
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}
