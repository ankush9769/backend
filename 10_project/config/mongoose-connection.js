const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(`${config.get("MONGODB_URI")}/bagshop`)     // TO understand this go to config folder and see the development.json file
.then(function(){     // it will be called when the connection is established
    console.log("connect sunccssful");
})
.catch(function(err){     //it will be called when the connection is not established
    console.log(err)
})

module.exports = mongoose.connection;