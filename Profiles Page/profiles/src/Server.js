const crypto = require('crypto')
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//connecting MongoDB
const conn = mongoose.createConnection(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//Initialize GridFS
let gfs;
conn.once('open', () => {
  console.log('GridFS initialized!')
  gfs =  new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "pures"
  });  
  
  
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
          bucketnName: "pures",
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
app.post('/data', upload.single("file"),(req, res)=>{    
    console.log('Sent successfully!')
    res.redirect('/')
})


//retreiving the datas
app.get('/data', async (req, res)=>{
  gfs =  new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "pures"
  });
  const cursor = gfs.find();
  for await (const doc of cursor){
    console.log(doc)
  }
  res.redirect("/")
  // gfs.find().toArray((err, files) => {
    
  //   // Check if files
  //   if (!files || files.length === 0) {
  //     return res.status(404).json({
  //       err: 'No file exists'
  //     })
  //   } 
  //   return res.json(files);
  // });
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


module.export = app;