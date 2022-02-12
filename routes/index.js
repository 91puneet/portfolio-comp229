let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'HOME' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('homepage', { title: 'HOME' });
});

/* GET About me page. */
router.get('/about', function(req, res, next) {
  res.render('aboutmepage', { title: 'About' });
});
/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projectspage', { title: 'Projects' });
});
/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('servicespage', { title: 'Services' });
});
/* GET  Contact Me page. */
router.get('/contact', function(req, res, next) {
  res.render('contactmepage', { title: 'contact' });
});
 

module.exports = router;
