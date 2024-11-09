const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/miniproject`)

let usermodel = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    image:{
            type: String,
            default: "default.jpg"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})
module.exports = mongoose.model('user', usermodel)