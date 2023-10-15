const Work = require('../models/WorksModel')
const jwt = require('jsonwebtoken')


// createStudent
exports.createWork = async (req, res) => {
    try{
        let reqBody = req.body;
        
        const newWork = await Work.create(reqBody)
        
        res.status(200).json({status:'success', data: newWork})
    
    }catch (e) {
        console.log(e)
    }
    }



exports.WorkLogin = async (req, res) => {
    try{
        let Email = req.body.Email
        let Password = req.body.Password
    
        const WorkData = await Work.find({Email,Password})
    
        let payload = {exp: Math.floor(Date.now() / 1000) + ( 24*60 * 60), Email:Email} 
        let token = jwt.sign(payload, "SecretKey123456789")
            
        
        res.status(200).json({status:'success',token:token, data:WorkData})
           
        
    }catch (e) {
        console.log(e)
    }
}





// readStudent
exports.readWork = async (req, res) => {
    try{
        let Email = req.headers.Email
        
        const selectWork = await Work.find({Email:Email})
        res.status(200).json({status:'success', data:selectWork})
            
    }catch (e) {
        console.log(e)
    }
}


// updateStudent
exports.updateWork = async (req, res) => {
    let Email = req.headers.Email
    let reqBody = req.body
    try{
        const updatedWork = await Work.updateOne({Email:Email}, reqBody)
        
        res.status(200).json({status:'success', data:updatedWork})
    }catch(e) {
        console.log(e)
    }
}






exports.deleteWork = async (req, res) => {
    let Email = req.headers.Email
    
    try{
        const deletedWork = await Work.deleteOne({Email})
        
        res.status(200).json({status:'success', data:deletedWork})
    }catch(e) {
        console.log(e)
    }
}