const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const profileSchema = new Schema({
name: String,
email: String,
phone: String,
image: String
})

const Profiles = model('Profiles', profileSchema);

module.exports = Profiles; 