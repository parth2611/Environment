var express = require('express');
var router = express.Router();

var schema_etimelineModel = require('../schema/schema_etimeline');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of etimeline.
/*GET etimeline Page. */
router.get('/add_etimeline', function (req, res, next) {
    res.render('etimeline/add_etimeline');
});

/* POST etimeline Page. */
router.post('/add_etimeline', function (req, res, next) {
    const schema_etimelineBodyData = {
        etimeline_email: req.body.etimeline_email,
        etimeline_password: req.body.etimeline_password
    }

    var data = schema_etimelineModel(schema_etimelineBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_etimelineBodyData);
            res.render('etimeline/add_etimeline');
        }
    });
});

/*Display Table of etimeline */
router.get('/view_etimeline', function (req, res) {
    schema_etimelineModel.find(function (err, etimeline) {
        if (err)
            console.log(err);
        else
            res.render('etimeline/view_etimeline', { etimelines: etimeline });
    });
});

/*Get Delete Page of etimeline */
router.get('/delete_etimeline/:id', function (req, res, next) {
    schema_etimelineModel.findByIdAndRemove(req.params.id, function (err, etimeline) {
        if (err) {
            console.log(err);
            res.redirect('../view_etimeline');
        }
        else
            res.redirect('../view_etimeline');
    });
});

/*Shows Single etimeline Data */
router.get('/show_etimeline/:id', function (req, res, next) {
    schema_etimelineModel.findById(req.params.id, function (err, etimeline) {
        if (err)
            console.log(err);
        else {
            console.log(etimeline);
            res.render('etimeline/show_etimeline', { etimelines: etimeline });
        }
    });
});

// Edit Data of etimeline.
/*Get Edit Page of etimeline. */
router.get('/edit_etimeline/:id', function (req, res) {
    console.log(req.params.id);
    schema_etimelineModel.findById(req.params.id, function (err, etimeline) {
        if (err)
            console.log(err);
        else
            console.log(etimeline);
        res.render('etimeline/edit_etimeline', { etimelines: etimeline });
    });
});

/*Post Edit Page of etimeline */
router.post('/edit_etimeline/:id', function (req, res) {
    const schema_etimelineBodyData = {
        etimeline_email: req.body.etimeline_email,
        etimeline_password: req.body.etimeline_password
    }

    schema_etimelineModel.findByIdAndUpdate(req.params.id, schema_etimelineBodyData, function (err) {
        if (err)
            res.redirect('etimeline/edit_etimeline/' + req.params.id);
        else
            res.redirect('../view_etimeline');
    });
});

module.exports = router;