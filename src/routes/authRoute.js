const express=require('express')
const { createUser, login, logout } = require('../controller/authController')
const route=express.Router()


route.post('/create',createUser)
route.post('/login',login)
route.get('/logout',logout)


module.exports=route