const express = require('express');
const app = express();
const port = 8000;
const path=require("path");
const db = require('./config/mongoose');
const Contact = require('./models/contact');


//express.urlencoded() used as a middleware to encode the data givenn by the form tag
app.use(express.urlencoded());
app.use(express.static('./assets'));

app.set("view engine", "ejs" )
// app.set("views" ,path.join(__dirname,"views") );

app.set('views','./views');

let contact = [{
    name:'sabir',
    mobile : 9058970413 
},
{
    name:'uvaish',
    mobile :8271877824
},
{
    name:'amzad',
    mobile :983711857
},
{
    name:'sadik hangg',
    mobile :9837238247
}]

app.get('/',function(req , res){
    //This function used to finid the data from the Mongo
    // Contact.find({Query} , callback)
    Contact.find({},function(err,data){
        if(err){ console.log('Error occur while fetching the data');}

        // console.log('====================',data);
        res.render("contact",{
            ContactList: data
       });
    })


//    res.render("contact",{
//     ContactList: contact
//    });
});

// app.get('/deleteContact/:mobile',function(req , res){
    // const mobile=req.params.mobile;
    // for(let i=0; i<contact.length; i++){
    //     let cont = contact[i];
    //     if(mobile == cont.mobile){
    //         contact.splice(i,1);
    //         res.redirect('back');
    //     }
    // }
// })

//Using Query Params
app.get('/deleteContact',function(req , res) {
    // console.log(req.query);

    //this fun Delete docs from database using its id sent by the user
    // Contact.findByIdAndDelete(_id ,callback)
    Contact.findByIdAndDelete(req.query.id, function(){
        console.log("The data you want to delete is successfully delete by id");
    })
    res.redirect('back');
});

app.post('/addContact',function(req ,res){

    // let newContact=req.body;
    // contact.push(newContact);  

    //We use create() using Schema object to store the data in DB
    // Contact.create({},function(err,data){})

    Contact.create({
        name:req.body.name,
        mobile:req.body.mobile
    },function(err,data){
        //handle error
        if(err){ console.log('Error occur while Creating data in DB'); return res.redirect('back');}
        // console.log('+++++++++++++++++++++++',data);
        return res.redirect('/');
    });




      
    // res.render("contact",{
    //     ContactList: contact
    //    });
});




app.listen(port , function(err){
    if(err){
        console.log('Error Occur While creating the server');
    }
    console.log('Contact list server is runnig successfully...');
})