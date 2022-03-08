//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022

let express = require('express');
let mongoose=require('mongoose');
let router =express.Router();   
let contacts=require('../models/contacts');



module.exports.displayContactsList=(req,res,next)=>{
    contacts.find((err,contactslist)=>{
    
    
        if(err){
            return console.error(err);
    
        }
        else{
           // console.log(contactslist);
           res.render('contacts/contactslist',{title:'contacts list',contactslist:contactslist,
                       
        });
        }
});
}
module.exports.displayAddPage=(req,res,next)=>{
    res.render('contacts/add',{title:'Add a contact', displayName:req.user? req.user.displayName:''})
    
    }

module.exports.processAddPage=(req,res,next)=>{
    let newContacts=contacts({
        "username":req.body.username,
        "password":req.body.password,
        "email":req.body.email

    })
    contacts.create(newContacts,(err,contacts)=>{
        if(err){
            console.log(err);
            res.end(err);

        }
        else{
            res.redirect('/contacts-list');
        }
    })
    
    }
    module.exports.displayEditPage=(req,res,next)=>{
        let id = mongoose.Types.ObjectId(req.params.id.trim());
            contacts.findById(id,(err,contactstoedit)=>{

                if(err)
                {
                    console.log(err);
                    res.end(err);

                }
                else
                {
                    res.render('contacts/edit',{title:'Edit a contacts',contacts:contactstoedit, displayName:req.user? req.user.displayName:''});
                }
            });
       
        
        }
        module.exports.processEditPage=(req,res,next)=>{
            let id = mongoose.Types.ObjectId(req.params.id.trim());
                let updatedcontacts=contacts({
                    "_id":id,
                    "username":req.body.username,
                    "password":req.body.password,
                    "email":req.body.email
                
                });
            contacts.updateOne({_id:id},updatedcontacts, (err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/contacts-list');
                }
            })
            }
            module.exports.performDelete=(req,res,next)=>{
                let id = mongoose.Types.ObjectId(req.params.id.trim());
                contacts.remove({_id:id},(err)=>{
    
                    if(err)
                    {
                        console.log(err);
                        res.end(err);
                    }
                    else
                    {
                        res.redirect('/contacts-list');
                    }
    
                })
    
    
    
             }
