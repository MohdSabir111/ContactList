    // 6 Stepss to make connection with mongoDB

//Add module to use it
const mongoose = require('mongoose');
//make connection with server 
mongoose.connect('mongodb://localhost:27017/contact_list_developer');

//Store connection in "db"
const db = mongoose.connection;

//Check any Error ?
db.on('error',console.error.bind(console,'Error occur while making connection'));

//if error free open the connection
db.once('open',function(){
    console.log('Connection is success : MongoDB');
});

//use to access this "db" in other file for making the connection
module.exports = db;