const express = require('express')
const router = express.Router()
const IsLoggedIn = require('../middlewares/isloggedin')
const productmodel = require('../models/product-model')

router.get('/',function(req,res){
    let error = req.flash("error");
    res.render("index",{error});
});

router.get('/shop',IsLoggedIn,async function(req,res){
    let products = await productmodel.find()
    res.render("shop",{products})
})






module.exports = router;