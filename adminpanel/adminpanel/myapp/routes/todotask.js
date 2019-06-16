var express = require('express');
var router = express.Router();

var schema_todotaskModel = require('../schema/schema_todotask');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of todotask.
/*GET todotask Page. */
router.get('/add_todotask', function (req, res, next) {
    res.render('todotask/add_todotask');
});

/* POST todotask Page. */
router.post('/add_todotask', function (req, res, next) {
    const schema_todotaskBodyData = {
        todotask_email: req.body.todotask_email,
        todotask_password: req.body.todotask_password
    }

    var data = schema_todotaskModel(schema_todotaskBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_todotaskBodyData);
            res.render('todotask/add_todotask');
        }
    });
});

/*Display Table of todotask */
router.get('/view_todotask', function (req, res) {
    schema_todotaskModel.find(function (err, todotask) {
        if (err)
            console.log(err);
        else
            res.render('todotask/view_todotask', { todotasks: todotask });
    });
});

/*Get Delete Page of todotask */
router.get('/delete_todotask/:id', function (req, res, next) {
    schema_todotaskModel.findByIdAndRemove(req.params.id, function (err, todotask) {
        if (err) {
            console.log(err);
            res.redirect('../view_todotask');
        }
        else
            res.redirect('../view_todotask');
    });
});

/*Shows Single todotask Data */
router.get('/show_todotask/:id', function (req, res, next) {
    schema_todotaskModel.findById(req.params.id, function (err, todotask) {
        if (err)
            console.log(err);
        else {
            console.log(todotask);
            res.render('todotask/show_todotask', { todotasks: todotask });
        }
    });
});

// Edit Data of todotask.
/*Get Edit Page of todotask. */
router.get('/edit_todotask/:id', function (req, res) {
    console.log(req.params.id);
    schema_todotaskModel.findById(req.params.id, function (err, todotask) {
        if (err)
            console.log(err);
        else
            console.log(todotask);
        res.render('todotask/edit_todotask', { todotasks: todotask });
    });
});

/*Post Edit Page of todotask */
router.post('/edit_todotask/:id', function (req, res) {
    const schema_todotaskBodyData = {
        todotask_email: req.body.todotask_email,
        todotask_password: req.body.todotask_password
    }

    schema_todotaskModel.findByIdAndUpdate(req.params.id, schema_todotaskBodyData, function (err) {
        if (err)
            res.redirect('todotask/edit_todotask/' + req.params.id);
        else
            res.redirect('../view_todotask');
    });
});

module.exports = router;