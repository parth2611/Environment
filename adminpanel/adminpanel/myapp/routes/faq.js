var express = require('express');
var router = express.Router();

var schema_faqModel = require('../schema/schema_faq');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET faq Page. */
router.get('/add_faq', function (req, res, next) {
    res.render('faq/add_faq');
});

/* POST faq Page. */
router.post('/add_faq', function (req, res, next) {
    const schema_faqBodyData = {
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer
    }

    var data = schema_faqModel(schema_faqBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
            res.render('faq/add_faq');
        }
        else {
            console.log(schema_faqBodyData);
            res.render('faq/add_faq');
        }
    });
});

/*Display Table of Admin */
router.get('/view_faq', function (req, res) {
    schema_faqModel.find(function (err, faq) {
        if (err)
            console.log(err);
        else
            res.render('faq/view_faq', { faqs: faq });
    });
});

/*Get Delete Page of faq */
router.get('/deletefaq/:id', function (req, res, next) {
    schema_faqModel.findByIdAndRemove(req.params.id, function (err, faq) {
        if (err) {
            console.log(err);
            res.redirect('../view_faq');
        }
        else
            res.redirect('../view_faq');
    });
});

/*Shows Single Category Data */
router.get('/showfaq/:id', function (req, res, next) {
    schema_faqModel.findById(req.params.id, function (err, faq) {
        if (err)
            console.log(err);
        else {
            console.log(faq);
            res.render('faq/show_faq', { faqs: faq });
        }
    });
});

/*Get Edit Page of Category. */
router.get('/editfaq/:id', function (req, res) {
    console.log(req.params.id);
    schema_faqModel.findById(req.params.id, function (err, faq) {
        if (err)
            console.log(err);
        else
            console.log(faq);
        res.render('faq/edit_faq', { faqs: faq });
    });
});

/*Post Edit Page of faq */
router.post('/editfaq/:id', function (req, res) {
    const schema_faqBodyData = {
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer
    }

    schema_faqModel.findByIdAndUpdate(req.params.id, schema_faqBodyData, function (err) {
        if (err)
            res.redirect('faq/editfaq/' + req.params.id);
        else
            res.redirect('../view_faq');
    });
});

module.exports = router;