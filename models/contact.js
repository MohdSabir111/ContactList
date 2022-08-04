//add module
const mongoose = require('mongoose');

//Using Schema() we create schema only

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
});

//Now .model() used to init.. the Schema in DataBase
const Contact = mongoose.model('Contact',contactSchema);

//Now this Schema object exports to used in main file
module.exports = Contact;