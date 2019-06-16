var express = require('express');
var router = express.Router();

var schema_feedbackModel = require('../schema/schema_feedback');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of feedback.
/*GET feedback Page. */
router.get('/add_feedback', function (req, res, next) {
    res.render('feedback/add_feedback');
});

/* POST feedback Page. */
router.post('/add_feedback', function (req, res, next) {
    const schema_feedbackBodyData = {
        feedback_email: req.body.feedback_email,
        feedback_password: req.body.feedback_password
    }

    var data = schema_feedbackModel(schema_feedbackBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_feedbackBodyData);
            res.render('feedback/add_feedback');
        }
    });
});

/*Display Table of feedback */
router.get('/view_feedback', function (req, res) {
    schema_feedbackModel.find(function (err, feedback) {
        if (err)
            console.log(err);
        else
            res.render('feedback/view_feedback', { feedbacks: feedback });
    });
});

/*Get Delete Page of feedback */
router.get('/delete_feedback/:id', function (req, res, next) {
    schema_feedbackModel.findByIdAndRemove(req.params.id, function (err, feedback) {
        if (err) {
            console.log(err);
            res.redirect('../view_feedback');
        }
        else
            res.redirect('../view_feedback');
    });
});

/*Shows Single feedback Data */
router.get('/show_feedback/:id', function (req, res, next) {
    schema_feedbackModel.findById(req.params.id, function (err, feedback) {
        if (err)
            console.log(err);
        else {
            console.log(feedback);
            res.render('feedback/show_feedback', { feedbacks: feedback });
        }
    });
});

// Edit Data of feedback.
/*Get Edit Page of feedback. */
router.get('/edit_feedback/:id', function (req, res) {
    console.log(req.params.id);
    schema_feedbackModel.findById(req.params.id, function (err, feedback) {
        if (err)
            console.log(err);
        else
            console.log(feedback);
        res.render('feedback/edit_feedback', { feedbacks: feedback });
    });
});

/*Post Edit Page of feedback */
router.post('/edit_feedback/:id', function (req, res) {
    const schema_feedbackBodyData = {
        feedback_email: req.body.feedback_email,
        feedback_password: req.body.feedback_password
    }

    schema_feedbackModel.findByIdAndUpdate(req.params.id, schema_feedbackBodyData, function (err) {
        if (err)
            res.redirect('feedback/edit_feedback/' + req.params.id);
        else
            res.redirect('../view_feedback');
    });
});

module.exports = router;