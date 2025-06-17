const express =require('express')
const {config}=require("dotenv")
const error=require('./src/middlewares/error')
config()

const app=express()

app.use(express.json())


app.use(error)// error middleware

app.listen(process.env.PORT,()=>{
    console.log(`server started and running on port ${process.env.PORT}`)
})


