const express =require('express')
const {config}=require("dotenv")
config()

const app=express()

app.use(express.json())


app.listen(process.env.PORT,()=>{
    console.log(`server started and running on port ${process.env.PORT}`)
})
