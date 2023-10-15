const mongoose = require('mongoose')

const worksSchema = mongoose.Schema(
    {
        Title: {type:String},
        ClassNote: {type:String,},
        Description: {type:String},      
        Status: {type:String},
        Email: {type:String},
        
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Work = mongoose.model("Works", worksSchema)

module.exports = Work