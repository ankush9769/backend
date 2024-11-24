const express = require('express')
const router = express.Router()
const productmodel = require('../models/product-model')
const upload = require('../config/multer-config')

router.get('/',function(req,res){
    res.send("hey this product routes")
})

router.post('/create',upload.single("image"),async function(req,res){
    // res.send(req.file)
    let{name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let product =await productmodel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    req.flash("success","Product created successfully")
    res.redirect('/owners/admin')

})

module.exports = router;