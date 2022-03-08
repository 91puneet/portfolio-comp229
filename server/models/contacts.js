//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022
let mongoose=require('mongoose');
const { stringify } = require('nodemon/lib/utils');

//create contacts model
let contactsmodel=mongoose.Schema({
 
username: String,
password: String,
email: String,

    
},
{
  collection:"contacts"  
}


)
module.exports=mongoose.model('contacts',contactsmodel);