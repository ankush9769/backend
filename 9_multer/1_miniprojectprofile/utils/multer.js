const multer = require('multer')
const crypto = require('crypto')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/upload')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12,function(err,string){   //this crypto is used to create random(uniqe) filename
            let name = string.toString('hex')
            const filename = name+path.extname(file.originalname)
            cb(null,filename)
        })   
    }
})
const upload = multer({ storage: storage })

module.exports = upload;