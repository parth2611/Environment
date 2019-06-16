var express = require('express');
var router = express.Router();

var schema_scoreModel = require('../schema/schema_score');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of score.
/*GET score Page. */
router.get('/add_score', function (req, res, next) {
    res.render('score/add_score');
});

/* POST score Page. */
router.post('/add_score', function (req, res, next) {
    const schema_scoreBodyData = {
        score_email: req.body.score_email,
        score_password: req.body.score_password
    }

    var data = schema_scoreModel(schema_scoreBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_scoreBodyData);
            res.render('score/add_score');
        }
    });
});

/*Display Table of score */
router.get('/view_score', function (req, res) {
    schema_scoreModel.find(function (err, score) {
        if (err)
            console.log(err);
        else
            res.render('score/view_score', { scores: score });
    });
});

/*Get Delete Page of score */
router.get('/delete_score/:id', function (req, res, next) {
    schema_scoreModel.findByIdAndRemove(req.params.id, function (err, score) {
        if (err) {
            console.log(err);
            res.redirect('../view_score');
        }
        else
            res.redirect('../view_score');
    });
});

/*Shows Single score Data */
router.get('/show_score/:id', function (req, res, next) {
    schema_scoreModel.findById(req.params.id, function (err, score) {
        if (err)
            console.log(err);
        else {
            console.log(score);
            res.render('score/show_score', { scores: score });
        }
    });
});

// Edit Data of score.
/*Get Edit Page of score. */
router.get('/edit_score/:id', function (req, res) {
    console.log(req.params.id);
    schema_scoreModel.findById(req.params.id, function (err, score) {
        if (err)
            console.log(err);
        else
            console.log(score);
        res.render('score/edit_score', { scores: score });
    });
});

/*Post Edit Page of score */
router.post('/edit_score/:id', function (req, res) {
    const schema_scoreBodyData = {
        score_email: req.body.score_email,
        score_password: req.body.score_password
    }

    schema_scoreModel.findByIdAndUpdate(req.params.id, schema_scoreBodyData, function (err) {
        if (err)
            res.redirect('score/edit_score/' + req.params.id);
        else
            res.redirect('../view_score');
    });
});

module.exports = router;