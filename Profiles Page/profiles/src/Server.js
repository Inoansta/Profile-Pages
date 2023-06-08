const Profiles = require('./Model')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');

require('dotenv').config();

app.use(bodyParser.json());

// const con = mongoose.createConnection(process.env.MONGOOSE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// //Initalize GridFS
// let gfs;
// con.once('open', ()=>{
//     console.log('DB connected!')
//     gfs = Grid(con.db, mongoose.mongo);
//     gfs.collection('uploads');
// })

// Create storage engine for Multer
const storage = new GridFsStorage({
    url: process.env.MONGOOSE_URI,
    file: (req, file) => {
      return {
        filename: file.originalname
      };
    }
  });
const upload = multer({ storage });

app.post('/data', (req, res)=>{
    console.log(req.body);
    // const image = req.file.filename;
    
    const newData = new Profiles(req.body);
    newData.save().then(() => console.log('Data saved successfully!'))
    .catch((err) => 
    {console.log('Error saving data:', err)
    res.status(500).json({ error: err.message })});
    res.redirect('/')
})

app.listen(3000, ()=> {
    console.log('Server Started')})

