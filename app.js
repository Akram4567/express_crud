const express = require('express')
const app = new express()
const router = require('./src/routes/api')
const bodyParser = require('body-parser')


// Security middleware require
const rateLimit = require('express-rate-limit')
const helmet  = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')




// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// database librery mongoose require
const mongoose = require('mongoose')


// Security middleware implement
app.use(cors())
app.use(hpp())
app.use(mongoSanitize())
app.use(helmet())


// body parser implement
app.use(bodyParser.json())


// requaest tate limit
const limiter = rateLimit({windowMs: 15*60*1000, max: 3000})
app.use(limiter)


// mongoDB connection
const connectDB = async () => {
    const URL = "mongodb://127.0.0.1:27017/School"
    const OPTION = {user: "", pass: "", autoIndex:true}
   await mongoose.connect(URL, OPTION)
try{
    console.log("mongoDB is connected with School")
}catch(e) {
    console.log(e)
}
}



// routing implement
app.use("/api/v1", router)


// undefined routing implement
app.use("*", (req, res) => {
    res.status(404).json({status: "fail", data: "404 not found"})
})



module.exports = {
    app,
    connectDB
}