const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    email: {
        type:String, 
        required:true, 
        unique:true
    },
    number:{
        type:String, 
        required:true, 
        unique:true
    },
    name:{
        type:String, 
        required:true, 
        unique:true
    },
    key: {
        type:String, 
        required:true, 
        unique:true
    }
})

const Profile = mongoose.model("Profile", profileSchema)

exports.Profile = Profile;