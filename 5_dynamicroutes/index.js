// console.log(__dirname+'\\public')  // it will print path of the current directory

// const path = require('path');     
// console.log(path.join(__dirname,'\\public'))  // this is another way to print the  path of the current directory 





const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())             //these 2 line is also known as parsers
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')       // setting ejs as the view engine and just becouse this line we dont need to write extention of the ejs file

app.use(express.static(path.join(__dirname,'public'))); //it use for image , css and js file
//basically this above line says all static file like  css,js,images etc are in public folder


app.get('/',function(req,res){
    res.render("index");
})


//dynamic routing
app.get('/ankush/:dynvar1',function(req,res){        //now here dynvar1 is act like variable
    //if you want to  get the value of dynvar1 then you can use req.params.dynvar1
    console.log(req.params.dynvar1);
    res.send('welcome '+req.params.dynvar1);
})

app.get('/ankush/:dynvar1/:dynvar2',function(req,res){        //now here dynvar1 and dynvar2 is act like variable
    //if you want to  get the value of pal then you can use req.params.pal
    console.log(req.params.dynvar1,req.params.dynvar2);
    // res.send(req.params)  //this will display the object 
    res.send(`welcome ${req.params.dynvar1} and ${req.params.dynvar2}`);
})


app.listen(3000,function(){
    console.log("server is running at 3000 port")
})


