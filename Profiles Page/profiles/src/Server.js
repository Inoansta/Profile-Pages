const express = require('express');
const app = express();
const {Profile} = require('./Model')
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const {uploadFile, deleteFile} = require('./S3')

const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOOSE_URI).then(()=> console.log('DB connected!'))

//uploaindg the datas
app.post('/data', upload.single('file'),async (req, res)=>{   
  const {name, email, number} = req.body 
  const file = req.file
  const result = await uploadFile(file)
  const profile = new Profile({
    name: name,
    email: email,
    number: number,
    key: result.key
  })
  profile.save();
  res.send('bb')

});


//retreiving the datas
app.get('/', (req, res)=>{

})


//delete the data by its _id
app.delete('/data', async (req, res)=>{
  await Profile.deleteOne({key : req.body.key})
  await deleteFile(req); 

  res.send('bb')
})  


app.listen(3000, ()=> {
    console.log('Server Started')})
