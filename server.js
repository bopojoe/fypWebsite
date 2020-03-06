const express = require('express')
const app = express()
const loginHandler = require("./handlers/login");
var bodyParser = require('body-parser')
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/favicon.ico', function (req, res) {
    res.render('index');
})


app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/authenticate', loginHandler.authenticate);

// app.listen(80, function () {
//     console.log('app listening on port 3000!')
// })

module.exports = app;