const express =require('express')
const {config}=require("dotenv")
const error=require('./src/middlewares/error')
const authRoute=require('./src/routes/authRoute')
const connectDb = require('./src/config/db')
const { swaggerUi, specs } = require('./src/config/swagger')
config()
connectDb()

const app=express()

app.use(express.json())
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

app.get('/auth/test',(req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log('User requested URL:', fullUrl);
  console.log('User requested URL:', req.originalUrl);
  return res.send("Works")
  //next();
})

//routes
app.use('/api/auth',authRoute)




app.use(error)// error middleware

const port =process.env.PORT||3333 

app.listen(port  ,()=>{
console.log(`Server started and running on http://localhost:${port}/api in ${process.env.NODE_ENV} mode`)})


