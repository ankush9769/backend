const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/profile', function (req, res) {
    res.send('profile page')
  })

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})