const asyncError = require("../middlewares/asyncError");
const ErrorHandler = require("../middlewares/ErrorHandler");
const Product = require("../models/main/productModel");


exports.createProduct = asyncError(async (req, res, next) => {
    const { name, stock, description } = req.body

    const product = await Product.createOne({ name, stock, description })

    if (!product) return next(new ErrorHandler("product creation failed", 400))

    res.status(200).json({
        success: true,
        product
    })

})