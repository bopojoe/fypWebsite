const express = require('express')
const app = express()
const loginHandler = require("./handlers/login");
const printItems = require("./handlers/returnItems")
var bodyParser = require('body-parser')
const googleStorage = require('@google-cloud/storage');
const formidable = require('formidable')
const config = require("./configs/firebase")

var fileName = "";
var filePath = "";

function upload(filepath, name ) {
  
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    projectId: config.projectId,
    keyFilename: "./configs/iosappfyp-users.json"
});

const bucket = storage.bucket(config.storageBucket);
const bucketName = config.storageBucket;
async function uploadFile() {
  // Uploads a local file to the bucket
  await storage.bucket(bucketName).upload(filepath, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    destination: "images/"+name||null, 
    // object you are uploading to a bucket.
    metadata: {
      cacheControl: 'no-cache',
    },
  });

  console.log(`${name||null} uploaded to ${bucketName}.`);
}

uploadFile().catch((err)=> {
    console.log("error here",err)
});
// [END storage_upload_file]
}

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

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
      file.path = '/tmp/' + file.name;

  });

  form.on('file',  (name, file) => {
      console.log(`Uploaded ${file.name} locally`);
      upload(file.path, file.name)
  });
  
  res.render('loggedIn')
  //res.sendFile(__dirname + '/uploads');
  
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

