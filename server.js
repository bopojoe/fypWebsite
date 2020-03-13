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

app.get('/loggedIn', function (req, res) {
    res.render('loggedIn');
})

app.post('/authenticate', loginHandler.authenticate);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

