const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const { isUtf8 } = require('buffer');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    fs.readdir('./files',function(err,files){  //this will ckeck your given directory whether thare is any file or not,if there is file then will retrurn in the form of array
        console.log(files);
        res.render("index",{filearray:files});
    })
});

//posting data to the file 
app.post('/create',function(req,res){
    console.log(req.body);  //this written just becouse let us know about  the data which we are sending from the form

    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.descripttion ,function(err,data){   //this line create the file with the name of title and all space will remove form the title
        res.redirect("/");  //after completion it will again send me to the /  route
    })

});


//getting data from the data
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"Utf-8",function(err,filedata){ //utf-8 is use for read the data in enlish language
        res.render('showfiledata',{data:filedata,filenaam:req.params.filename}) //{data:filedata} will display the data of the file and {filenaam:req.params.filename} will display the name of the file
    })
});


//edit filename
app.get('/edit/:filename',function(req,res){
    res.render("editfile",{filename:req.params.filename});
});

app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.previus}`,`./files/${req.body.new}.txt`,function(err){
        if(err) throw err;
        else{
            res.redirect("/");
        }
    })
});


//deleting the file
app.get('/delete/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect("/");
    })
});







app.listen(3000,()=>{
    console.log("serever is running at 3000 port")
});