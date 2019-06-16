var express = require('express');
var router = express.Router();

var schema_activitytypeModel = require('../schema/schema_activitytype');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of activitytype.
/*GET activitytype Page. */
router.get('/add_activitytype', function (req, res, next) {
    res.render('activitytype/add_activitytype');
});

/* POST activitytype Page. */
router.post('/add_activitytype', function (req, res, next) {
    const schema_activitytypeBodyData = {
        activitytype_email: req.body.activitytype_email,
        activitytype_password: req.body.activitytype_password
    }

    var data = schema_activitytypeModel(schema_activitytypeBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_activitytypeBodyData);
            res.render('activitytype/add_activitytype');
        }
    });
});

/*Display Table of activitytype */
router.get('/view_activitytype', function (req, res) {
    schema_activitytypeModel.find(function (err, activitytype) {
        if (err)
            console.log(err);
        else
            res.render('activitytype/view_activitytype', { activitytypes: activitytype });
    });
});

/*Get Delete Page of activitytype */
router.get('/delete_activitytype/:id', function (req, res, next) {
    schema_activitytypeModel.findByIdAndRemove(req.params.id, function (err, activitytype) {
        if (err) {
            console.log(err);
            res.redirect('../view_activitytype');
        }
        else
            res.redirect('../view_activitytype');
    });
});

/*Shows Single activitytype Data */
router.get('/show_activitytype/:id', function (req, res, next) {
    schema_activitytypeModel.findById(req.params.id, function (err, activitytype) {
        if (err)
            console.log(err);
        else {
            console.log(activitytype);
            res.render('activitytype/show_activitytype', { activitytypes: activitytype });
        }
    });
});

// Edit Data of activitytype.
/*Get Edit Page of activitytype. */
router.get('/edit_activitytype/:id', function (req, res) {
    console.log(req.params.id);
    schema_activitytypeModel.findById(req.params.id, function (err, activitytype) {
        if (err)
            console.log(err);
        else
            console.log(activitytype);
        res.render('activitytype/edit_activitytype', { activitytypes: activitytype });
    });
});

/*Post Edit Page of activitytype */
router.post('/edit_activitytype/:id', function (req, res) {
    const schema_activitytypeBodyData = {
        activitytype_email: req.body.activitytype_email,
        activitytype_password: req.body.activitytype_password
    }

    schema_activitytypeModel.findByIdAndUpdate(req.params.id, schema_activitytypeBodyData, function (err) {
        if (err)
            res.redirect('activitytype/edit_activitytype/' + req.params.id);
        else
            res.redirect('../view_activitytype');
    });
});

module.exports = router;