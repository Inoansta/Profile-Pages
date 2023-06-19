const crypto = require('crypto')
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
const {createModel} = require('mongoose-gridfs');
const {ObjectId} = require('mongodb');
const { Readable } = require('stream');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

let Attachment
//connecting MongoDB
const conn = mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
}).then(()=> {
  console.log("Connected to MongoDB");
  // Allocate model into Attachment
  Attachment = createModel();
}).catch((error) => {
  console.error(error);
});


//Initialize GridFS
// let gfs;
// conn.once('open', () => {
//   console.log('GridFS initialized!')
//   gfs =  new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "pures"
//   });  
  
  
// });

// // Create storage engine for Multer
// const storage = new GridFsStorage({
//   url: process.env.MONGOOSE_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }

//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketnName: "pures",
//           metadata:{
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone
//           }
//         };
//         resolve(fileInfo);
//       });
//     });
  
// }});
// const upload = multer({ storage });


//uploaindg the datas
app.post('/data', (req, res)=>{    
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage})
  upload.single('file')(req, res, (err) => {
    if (err) {
        return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
        return res.status(400).json({ message: "No track name in request body" });
    }

    const readStream = Readable.from(req.file.buffer);
    const options = ({ filename: req.file.originalname, contenttype: "image/png", metadata:{name: req.body.name, email: req.body.email, phone: req.body.phone}});
    Attachment.write(options, readStream)
    res.redirect('/')
});
});


//retreiving the datas
app.get('/data', (req, res)=>{
  // gfs =  new mongoose.mongo.GridFSBucket(conn.db, {
  //   bucketName: "pures"
  // });
  // const cursor = gfs.find();
  // for await (const doc of cursor){
  //   console.log(doc)
  // }
  // res.redirect("/")
  // gfs.find().toArray((err, files) => {
    
  //   // Check if files
  //   if (!files || files.length === 0) {
  //     return res.status(404).json({
  //       err: 'No file exists'
  //     })
  //   } 
  //   return res.json(files);
  // });
  res.set('content-type', "image/png");
  res.set('accept-ranges', 'bytes');


})


//delete the data by its _id
app.delete('/data', (req, res)=>{
  if(!req.query.id) {
    return res.status(400).json({
        message: "Invalid ID in URL parameter."
    });
}

console.log(req.query.id)
let id = new ObjectId(req.query.id)
console.log(typeof id);
Attachment.deleteFile({_id: id});

})  


//edit the data and call it by its _id
app.put('/data', (req, res)=>{
  

})



app.listen(3000, ()=> {
    console.log('Server Started')})
