const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer')
const crypto = require('crypto')

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


//uploading th file to diskstorage                  and it also act like a middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/upload')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12,function(err,bytes){   //this crypto is used to create random(uniqe) filename
            let byte = bytes.toString('hex')
            const filename = byte+path.extname(file.originalname)
            cb(null,filename)
        })   
    }
})
const upload = multer({ storage: storage })


app.get('/',function(req,res){
    res.render("index");
})

app.post('/upload',upload.single("image"),function(req,res){
    // res.send(req.body);//it will text info of the image like name of image
    res.send(req.file);  // it contains all info af actuall uploaded file
    console.log(req.body)
    console.log(req.file)
})

app.listen(3000,function(){
    console.log('Server is running on port 3000');
})