var express = require('express');
var router = express.Router();

var schema_postcategoryModel = require('../schema/schema_postcategory');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of postcategory.
/*GET postcategory Page. */
router.get('/add_postcategory', function (req, res, next) {
    res.render('postcategory/add_postcategory');
});

/* POST postcategory Page. */
router.post('/add_postcategory', function (req, res, next) {
    const schema_postcategoryBodyData = {
        postcategory_email: req.body.postcategory_email,
        postcategory_password: req.body.postcategory_password
    }

    var data = schema_postcategoryModel(schema_postcategoryBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_postcategoryBodyData);
            res.render('postcategory/add_postcategory');
        }
    });
});

/*Display Table of postcategory */
router.get('/view_postcategory', function (req, res) {
    schema_postcategoryModel.find(function (err, postcategory) {
        if (err)
            console.log(err);
        else
            res.render('postcategory/view_postcategory', { postcategorys: postcategory });
    });
});

/*Get Delete Page of postcategory */
router.get('/delete_postcategory/:id', function (req, res, next) {
    schema_postcategoryModel.findByIdAndRemove(req.params.id, function (err, postcategory) {
        if (err) {
            console.log(err);
            res.redirect('../view_postcategory');
        }
        else
            res.redirect('../view_postcategory');
    });
});

/*Shows Single postcategory Data */
router.get('/show_postcategory/:id', function (req, res, next) {
    schema_postcategoryModel.findById(req.params.id, function (err, postcategory) {
        if (err)
            console.log(err);
        else {
            console.log(postcategory);
            res.render('postcategory/show_postcategory', { postcategorys: postcategory });
        }
    });
});

// Edit Data of postcategory.
/*Get Edit Page of postcategory. */
router.get('/edit_postcategory/:id', function (req, res) {
    console.log(req.params.id);
    schema_postcategoryModel.findById(req.params.id, function (err, postcategory) {
        if (err)
            console.log(err);
        else
            console.log(postcategory);
        res.render('postcategory/edit_postcategory', { postcategorys: postcategory });
    });
});

/*Post Edit Page of postcategory */
router.post('/edit_postcategory/:id', function (req, res) {
    const schema_postcategoryBodyData = {
        postcategory_email: req.body.postcategory_email,
        postcategory_password: req.body.postcategory_password
    }

    schema_postcategoryModel.findByIdAndUpdate(req.params.id, schema_postcategoryBodyData, function (err) {
        if (err)
            res.redirect('postcategory/edit_postcategory/' + req.params.id);
        else
            res.redirect('../view_postcategory');
    });
});

module.exports = router;