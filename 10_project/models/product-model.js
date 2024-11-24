const mongoose = require('mongoose')

let productmodel = mongoose.Schema({
    image:Buffer,
    name:{
        type:String,
        minLength:3,
        trim:true
    },
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    textcolor:String,
    panelcolor:String
})

module.exports = mongoose.model("product",productmodel);