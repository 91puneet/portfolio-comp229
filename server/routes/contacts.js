//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022
let express = require('express');
let mongoose=require('mongoose');
let router =express.Router();   
let passport=require('passport');


let contacts=require('../models/contacts')
let contactsController=require('../controllers/contacts');

function requireAuth(req,res,next){
    if(!req.isAuthenticated()) {

        return res.redirect('/login');     
    }
    next();
}
//connect to     our contacts model
router.get('/',contactsController.displayContactsList);

/*get Route for the contact list page -create operations   */
    router.get('/add',requireAuth,contactsController.displayAddPage);
    /*post Route for the contact list page -create operations   */
    router.post('/add',requireAuth,contactsController.processAddPage);
    
        /*get Route for the contact list page -update operations   */
    router.get('/edit/:id',requireAuth,contactsController.displayEditPage);
        
         /*get Route for the contact list page -update operations   */
    router.post('/edit/:id',requireAuth,contactsController.processEditPage);
         /*get Route for the delete contact page -Delete operations   */
         router.get('/delete/:id',requireAuth,contactsController.performDelete);

module.exports=router;