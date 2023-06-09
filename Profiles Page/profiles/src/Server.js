const Profiles = require('./Model')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Profile'
})
.then(console.log('DB connected!'))

//uploaindg the datas
app.post('/data', (req, res)=>{
    console.log(req.body);

    const newData = new Profiles(req.body)  ;
    newData.save()
    .then(() => console.log('Data saved successfully!'))
    .catch((err) =>   
    {console.log('Error saving data:', err)``
    res.status(500).json({ error: err.message })});
    
    res.redirect('/')
})


//retreiving the data
app.get('/data', (req, res)=>{
  const { filename } = req.params;

    Profiles.find({}, (err, data)=>{
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(data);
      }
    });
})


//delete the data
app.delete('/data', (req, res)=>{
  
})


//edit the data
app.put('/data', (req, res)=>{

})



app.listen(3000, ()=> {
    console.log('Server Started')})

