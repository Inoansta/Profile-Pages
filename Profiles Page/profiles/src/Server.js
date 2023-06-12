const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto')

require('dotenv').config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const conn = mongoose.createConnection(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//Initialize GridFS
let gfs;
conn.once('open', () => {
  console.log('GridFS initialized!')
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');  
  
});

// Create storage engine for Multer
const storage = new GridFsStorage({
  url: process.env.MONGOOSE_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
          
          

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata:{
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
          }
        };
        resolve(fileInfo);
      });
    });
  
}});
const upload = multer({ storage });


//uploaindg the datas
app.post('/data', upload.single('file'),(req, res)=>{    
    console.log('Sent successfully!')
    res.redirect('/')
})


//retreiving the datas
app.get('/data', (req, res)=>{
  gfs.collection('uploads').find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
})


//delete the data by its _id
app.delete('/data', (req, res)=>{
 
    res.redirect('/')
})  


//edit the data and call it by its _id
app.put('/data', (req, res)=>{
  

})



app.listen(3000, ()=> {
    console.log('Server Started')})
