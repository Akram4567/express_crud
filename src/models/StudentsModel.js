const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
    {
        Email: {type:String},
        FirstName: {type:String,},
        LastName: {type:String},      
        Mobile: {type:String},
        Password: {type:String},
        Address: {type:String},
        Roll: {type:String},
        Class: {type:String},
        
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Student = mongoose.model("Students", studentSchema)

module.exports = Student




