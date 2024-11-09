const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/error', function (req, res, next) {
    return next(  new  Error('Something went wrong'));                //this error message will print on  the console
})

app.get('/profile', function (req, res) {
    res.send('profile')
  })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');   //this will print on front end
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})