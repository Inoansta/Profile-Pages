const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI).then(()=>{console.log('MongoDB Connected Well')})

app.listen(3000, ()=> {
    console.log('Server Started')});


