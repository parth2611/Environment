var express = require('express');
var router = express.Router();

var schema_achievementModel = require('../schema/schema_achievement');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of achievement.
/*GET achievement Page. */
router.get('/add_achievement', function (req, res, next) {
    res.render('achievement/add_achievement');
});

/* POST achievement Page. */
router.post('/add_achievement', function (req, res, next) {
    const schema_achievementBodyData = {
        achievement_email: req.body.achievement_email,
        achievement_password: req.body.achievement_password
    }

    var data = schema_achievementModel(schema_achievementBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_achievementBodyData);
            res.render('achievement/add_achievement');
        }
    });
});

/*Display Table of achievement */
router.get('/view_achievement', function (req, res) {
    schema_achievementModel.find(function (err, achievement) {
        if (err)
            console.log(err);
        else
            res.render('achievement/view_achievement', { achievements: achievement });
    });
});

/*Get Delete Page of achievement */
router.get('/delete_achievement/:id', function (req, res, next) {
    schema_achievementModel.findByIdAndRemove(req.params.id, function (err, achievement) {
        if (err) {
            console.log(err);
            res.redirect('../view_achievement');
        }
        else
            res.redirect('../view_achievement');
    });
});

/*Shows Single achievement Data */
router.get('/show_achievement/:id', function (req, res, next) {
    schema_achievementModel.findById(req.params.id, function (err, achievement) {
        if (err)
            console.log(err);
        else {
            console.log(achievement);
            res.render('achievement/show_achievement', { achievements: achievement });
        }
    });
});

// Edit Data of achievement.
/*Get Edit Page of achievement. */
router.get('/edit_achievement/:id', function (req, res) {
    console.log(req.params.id);
    schema_achievementModel.findById(req.params.id, function (err, achievement) {
        if (err)
            console.log(err);
        else
            console.log(achievement);
        res.render('achievement/edit_achievement', { achievements: achievement });
    });
});

/*Post Edit Page of achievement */
router.post('/edit_achievement/:id', function (req, res) {
    const schema_achievementBodyData = {
        achievement_email: req.body.achievement_email,
        achievement_password: req.body.achievement_password
    }

    schema_achievementModel.findByIdAndUpdate(req.params.id, schema_achievementBodyData, function (err) {
        if (err)
            res.redirect('achievement/edit_achievement/' + req.params.id);
        else
            res.redirect('../view_achievement');
    });
});

module.exports = router;