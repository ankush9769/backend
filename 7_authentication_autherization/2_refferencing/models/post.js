const mongoose = require('mongoose')

let postmodel = mongoose.Schema({
    postdata:String,
    userid:{
        type:mongoose.Schema.Types.ObjectId,   // it will  be the id of the user
        ref:'user'                             //it will take refference of user
    },
    date:{
        type:Date,
        defoult:Date.now
    }
})

module.exports = mongoose.model("post",postmodel)