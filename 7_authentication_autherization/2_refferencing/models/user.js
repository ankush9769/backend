const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/refferencing`)

let usermodel = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,   //it  will store the id of the post
            ref:"post"                            //it take the refference of post
        }
    ]
})

module.exports = mongoose.model("user",usermodel)