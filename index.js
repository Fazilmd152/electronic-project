const express =require('express')
const {config}=require("dotenv")
const error=require('./src/middlewares/error')
const authRoute=require('./src/routes/authRoute')
const connectDb = require('./src/config/db')
config()
connectDb()

const app=express()

app.use(express.json())

//routes
app.use('/api/auth',authRoute)




app.use(error)// error middleware

app.listen(process.env.PORT,()=>{
    console.log(`server started and running on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})


