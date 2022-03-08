//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022
let mongoose = require('mongoose');
let passportLocalMongoose= require('passport-local-mongoose');

let User =mongoose.Schema(
    {
        username:{
            type:String,
            default:'',
            trim:true,
            required:'username is required'
        },
        email:{
            type:String,
            default:'',
            trim:true,
            required:'email is required '
        },
        displayName:{
            type:String,
            default:'',
            trim:true,
            required:'Display name is required'
        },
        created:{
            type:Date,
            default:Date.now,            
        },
        updated:{
            type:Date,
            default:Date.now, 
        }

},

{


collection: "users"

});

let options=({missingPasswordError:'wrong /missing password'});
User.plugin(passportLocalMongoose,options);
module.exports.User=mongoose.model('User',User);