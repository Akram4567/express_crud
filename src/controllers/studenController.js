const Student = require('../models/StudentsModel')
const jwt = require('jsonwebtoken')
const SendEmailUtility = require('../utility/SendEmailUtility')
const OTPModel = require('../models/OTPModel')



// createStudent
exports.createStudent = async (req, res) => {
    try{
        let reqBody = req.body;
        
        const newStudent = await Student.create(reqBody)
        
        res.status(200).json({status:'success', data: newStudent})
    
    }catch (e) {
        console.log(e)
    }
    }



exports.studentLogin = async (req, res) => {
    try{
        let Email = req.body.Email
        let Password = req.body.Password
    
        const studentData = await Student.find({Email,Password})
    
        let payload = {exp: Math.floor(Date.now() / 1000) + ( 24*60 * 60), Email:Email} 
        let token = jwt.sign(payload, "SecretKey123456789")
            
        
        res.status(200).json({status:'success',token:token, data:studentData})
           
        
    }catch (e) {
        console.log(e)
    }
}





// readStudent
exports.readStudent = async (req, res) => {
    try{
        let Email = req.headers.Email
        
        const selectStudent = await Student.find({Email:Email})
        res.status(200).json({status:'success', data:selectStudent})
            
    }catch (e) {
        console.log(e)
    }
}


// updateStudent
exports.updateStudent = async (req, res) => {
    let Email = req.headers.Email
    let reqBody = req.body
    try{
        const updatedStudent = await Student.updateOne({Email:Email}, reqBody)
        
        res.status(200).json({status:'success', data:updatedStudent})
    }catch(e) {
        console.log(e)
    }
}






exports.deleteStudent = async (req, res) => {
    let Email = req.headers.Email
    
    try{
        const deletedStudent = await Student.deleteOne({Email})
        
        res.status(200).json({status:'success', data:deletedStudent})
    }catch(e) {
        console.log(e)
    }
}





exports.emailVerification = async (req, res) => {
    try{
        let Email = req.headers.Email
        let OTP = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `your Verification code is ${OTP}`
        let EmailSubject = "your verification code has been sent"
        let Status = 0;

        await SendEmailUtility(Email, EmailText, EmailSubject)

        const OTPData = await OTPModel.create({Email:Email, OTP:OTP, Status:Status})
        console.log(OTPData)
        res.status(200).send({status:"success", data: OTPData})

    }catch(e) {
        console.log(e)

    }
    
}




exports.OTPVerification = async (req, res) => {
    try{
        let Email = req.body.Email
        let OTP = req.body.OTP
        let Status = 0;
        let updateStatus = 1;

        const OTPData = await OTPModel.find({Email:Email, OTP:OTP, Status:Status}).count()
        if(OTPData === 1) {
            const updateStatusData = await OTPModel.updateOne({Email:Email, OTP:OTP, Status:Status}, {Status:updateStatus})
            res.status(200).json({status: 'success',data:updateStatusData})
        }else {
            res.status(200).json({status: 'fail'})
        }

    }catch(e) {
        console.log(e)

    }
    
}



exports.resetPassword = async (req, res) => {
    let Email = req.headers.Email
    let Password = req.body.Password
    
    try{
        const updatedData = await Student.updateOne({Email:Email}, {Password:Password})
        
        res.status(200).json({status:'success', data:updatedData})
    }catch(e) {
        console.log(e)
    }
}