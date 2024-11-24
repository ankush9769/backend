const jwt = require('jsonwebtoken')
const usermodel = require('../models/user-model')


module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        // res.send("you need to login first")
        req.flash("error", "you need to login first")  //for this install connect-flash and require it and do some config like session use in app.ja
        res.redirect("/");
    }
    else {
        try{
            let decode = jwt.verify(req.cookies.token, "secrete")
            let user = await usermodel.findOne({ email: decode.email }).select("-password");
            req.user = user
            next();
        }
        catch (err){
            req.send("some things went wrong")
            req.flash("error", "some thing went wrong")
            res.redirect("/");
        }
    }
};