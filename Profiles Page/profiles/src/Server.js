const Profiles = require('./Model')
const express = require('express');
const app = express();
const mongoose = require('mongoose')

require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI).then(()=>{console.log('MongoDB Connected Well')})

app.get('/save', (req, res)=>{
    let new_profile = Profiles(req);
    new_profile.save()
})

app.listen(3000, ()=> {
    console.log('Server Started')});

