const mongoose = require('mongoose')

let postmodel = mongoose.Schema({
    userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
    },
    date:{
            type:Date,
            default:Date.now
    },
    content:String,
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})
module.exports = mongoose.model('post',postmodel)