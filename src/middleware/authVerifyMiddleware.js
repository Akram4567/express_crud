const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        let token = req.headers.token
        // console.log(token)
        let data = jwt.verify(token, "SecretKey123456789")
        console.log(data)
        let Email = data.Email
        // console.log(Email)
        req.headers.Email = Email
        next()
    }catch(e) {
        console.log(e)
    }
}