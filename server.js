require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const db = require('mongodb')
const bodyParser = require("body-parser")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const fileData = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }

  res.json(fileData)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
