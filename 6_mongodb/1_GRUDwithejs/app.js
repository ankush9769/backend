const express = require('express')
const app =  express();
const path =  require('path')
const userModel = require('./models/user') 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(res,req){
    req.render("index")
})

app.post('/create',async function(res,req){
    let usercreated = await userModel.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
    });
    res.redirect("/read");
});

app.get('/read',async function(res,req){
    let alluser = await userModel.find();
    req.render("read",{users:alluser})
})



app.get('/delete/:deluser',async function(res,req){
    let deleteduser = await userModel.findOneAndDelete({_id: req.params.deluser})
    res.redirect("/read");
});



app.get('/user/edit/:edituser',async function(res,req){
    let edituser = await userModel.findOne({_id:req.params.edituser});
    req.render("edit",{details:edituser});
    
});

app.post('/update/:updateuser',async function(res,req){
    let {name,email,image} = req.body;
    let updateuser = await userModel.findOneAndUpdate({_id:req.params.updateuser},{name,email,image},{new:true});
    res.redirect("/read");
});



app.listen(3000,function(){
    console.log("server is running at 3000")
});

