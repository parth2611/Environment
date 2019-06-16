
var express = require('express');
var router = express.Router();

//Call User Database Model

//var AdminModel = require('../schema/table_admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/add', function(req, res, next) {
  res.render('form');
});

//adding form processing using Post Method

router.post('/add', function(req, res, next) {
  console.log(req.body);
});

//create array

//const mybodydata = {
  // A_id : req.body.A_id, 
   //A_Email : req.body.A_Email,
//   A_Password : req.body.A_Password
//}

//var data = AdminModel(mybodydata);

//data.save(function(err){
 // if(err){
   //   console.log("Error in Insert Record");
 // } else {
   //   res.render('add');
  //}
//})

router.get('/view', function(req, res, next) {
  res.render('table');
});



router.get('/add_achievement', function(req, res, next) {
  res.render('add_achievement');
});


router.get('/view_achievement', function(req, res, next) {
  res.render('view_achievement');
});


router.get('/add_activity', function(req, res, next) {
  res.render('add_activity');
});


router.get('/view_activity', function(req, res, next) {
  res.render('view_activity');
});


router.get('/add_activitytype', function(req, res, next) {
  res.render('add_activitytype');
});


router.get('/view_activitytype', function(req, res, next) {
  res.render('view_activitytype');
});


router.get('/add_admin', function(req, res, next) {
  res.render('add_admin');
});


router.get('/view_admin', function(req, res, next) {
  res.render('view_admin');
});


router.get('/add_etimeline', function(req, res, next) {
  res.render('add_etimeline');
});


router.get('/view_etimeline', function(req, res, next) {
  res.render('view_etimeline');
});


router.get('/add_event', function(req, res, next) {
  res.render('add_event');
});


router.get('/view_event', function(req, res, next) {
  res.render('view_event');
});


router.get('/add_feedback', function(req, res, next) {
  res.render('add_feedback');
});


router.get('/view_feedback', function(req, res, next) {
  res.render('view_feedback');
});


router.get('/add_postcategory', function(req, res, next) {
  res.render('add_postcategory');
});


router.get('/view_postcategory', function(req, res, next) {
  res.render('view_postcategory');
});


router.get('/add_score', function(req, res, next) {
  res.render('add_score');
});


router.get('/view_score', function(req, res, next) {
  res.render('view_score');
});


router.get('/add_todotaskpost', function(req, res, next) {
  res.render('add_todotaskpost');
});


router.get('/view_todotaskpost', function(req, res, next) {
  res.render('view_todotaskpost');
});



router.get('/add_user', function(req, res, next) {
  res.render('add_user');
});


router.get('/view_user', function(req, res, next) {
  res.render('view_user');
});


module.exports = router;
