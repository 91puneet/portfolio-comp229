//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022
let express = require('express');
let router = express.Router();

let indexController= require('../controllers/index');
/* GET home page. */
router.get('/',indexController.displayHomePage);

/* GET home page. */
router.get('/home',indexController.displayHomePage);

/* GET About me page. */
router.get('/about',indexController.displayAboutPage);
/* GET Projects page. */
router.get('/projects',indexController.displayProjectsPage);
/* GET Services page. */
router.get('/services',indexController.diplayServicesPage);
/* GET  Contact Me page. */
router.get('/contact',indexController.displayContactmePage);


/* GET Route for displaying the login page. */
router.get('/login',indexController.displayLoginPage);
 /* Post Route for processing the login page. */

 router.post('/login',indexController.processLoginPage);

/* GET Route for displaying the login page. */
router.get('/register',indexController.displayregistrationPage);
 /* Post Route for processing the login page. */

 router.post('/register',indexController.processregistrationPage);

/* GET Route for logout  page. */
router.get('/logout',indexController.performLogout);

module.exports = router;
