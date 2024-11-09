//writefile = create the write the content in the file
//appendfile = append the content to the  end of the file
//readfile = read the file
//copyfile = create the copy of the file
//rename = rename the file
//unlink = delete the file
//rmdir = delete the folder
//rm =  unlink
//mkdir = to create the folder


//for more info about file system goto(`https://nodejs.org/docs/latest/api/fs.html`)

const fs = require('fs')
fs.writeFile("file.txt","hello this new file",function(err){   //it is used for creating file
    if(err) console.log(err);
    else  console.log("file created");
});

// fs.appendFile("file.txt","\nhere i am appending this text",function(err){
//     if(err) console.log(err);
//     else console.log("successfully appended");
// })

// fs.rename("file.txt","files.txt",function(err){
//     if(err) console.log(err);
//     else console.log("rename successfully");
// })

// fs.copyFile("file.txt","./paste.txt",function(err){
//     if(err) console.log(err);
//     else  console.log("file copied");
// });

// fs.unlink("./paste.txt",function(err){      //unlike is used for delete the file
//     if(err) console.log(err);
//     else  console.log("file deleted by  unlink");

// });





// fs.rm("./hello.txt",function(err){
//     if(err)  console.log(err);
//     else  console.log("file deleted by rm");
// });


// fs.mkdir("./newfolder",function(err){
//     if(err) console.log(err);
//     else console.log("folder created");
// })

// fs.rmdir("./newfolder",{recursive:true},function(err){     //it delete only empty folder 
//     if(err)  console.log(err);      //for deleteing  folder that contains some file or folder then we need to use recursive option with true value
//     else  console.log("directory deleted");
// });


fs.readFile("./files.txt",function(err,data){
    if(err) console.log(err);
    else console.log(data.toString());
})



