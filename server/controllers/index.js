//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022

let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let passport=require('passport');
let index=require('../routes/index');

let userModel=require('../models/user');
let User=userModel.User;

module.exports.displayHomePage=(req, res, next) => {
    res.render('home', { title: 'HOME' });
  }

module.exports.displayAboutPage=(req, res, next)=> {
    res.render('aboutmepage', { title: 'About' });
  }
  module.exports.displayProjectsPage=(req, res, next) =>{
    res.render('projectspage', { title: 'Projects' });
  }
module.exports.diplayServicesPage=(req, res, next)=> {
    res.render('servicespage', { title: 'Services' });
  }
module.exports.displayContactmePage=(req, res, next)=> {
    res.render('contactmepage', { title: 'contact' });
  }
module.exports.displayLoginPage=(req, res, next)=> {
   if(!req.user)
   {

       res.render('auth/login',{

        title:"Login",
        messages:req.flash('loginMessage'),
        displayName:req.user?req.user.displayName: ''       
    })
    
   }else
   {
         return res.redirect('/contact');
   }


}

module.exports.processLoginPage=(req, res, next)=> {
passport.authenticate('local',(err,user,info)=>{

    if(err){

        return next(err);
    }
    if(!user){
        req.flash('loginMessage','Authentication Error');
        return res.redirect('/login');
    }
    req.login(user,(err)=>{

        if(err){

            return next(err);
        }
        return res.redirect('/contacts-list');
        const payload={
            id:user._id,
            displayName:user.displayName,
            username:user.username,
            email:user.email
        }
    });

})(req,res,next);
 
 }  

 module.exports.displayregistrationPage=(req, res, next)=> {
    if(!req.user){
        res.render('auth/register',{
 
         title:"Register",
         messages:req.flash('registerMessage'),
         displayName:req.user ?req.user.displayName:''       
     });
     
    }else
    {
          return res.redirect('/contact')
    }
 
 
 }
 
 module.exports.processregistrationPage=(req, res, next)=> {
    let newUser= new User({

        username:req.body.username,
        email:req.body.email,
        displayName:req.body.displayName
    });
    User.register(newUser,req.body.password,(err)=>{

        if(err){
            console.log("Error: Inserting new user failed")
            if(err.name=="UserExistError"){

                req.flash('registerMessage','Registration Failed :user Already Exists');
        }
            console.log('User Registration error')
        
        return res.render('auth/register',{

            title:"Register",
            messages:req.flash('registerMessage'),
            displayName:req.user ?req.user.displayName:''

        })
    
    }
    else{
        return passport.authenticate('local')(req,res,()=>{

            res.redirect('/contacts-list')
        })
    }
    }); 
 
 }

 module.exports.performLogout=(req,res,next)=>{
     req.logout();
     res.redirect('/contact');
 }