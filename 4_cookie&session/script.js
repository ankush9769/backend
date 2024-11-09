const express = require('express')
const app = express()

app.use(express.json());                 //these 2 line are responsive to make able to read the data from the server
app.use(express.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/profile', function (req, res) {
    res.send('profile page')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})