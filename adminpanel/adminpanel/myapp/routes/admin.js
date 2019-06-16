var express = require('express');
var router = express.Router();

var schema_adminModel = require('../schema/schema_admin');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of Admin.
/*GET Admin Page. */
router.get('/add_admin', function (req, res, next) {
    res.render('admin/add_admin');
});

/* POST Admin Page. */
router.post('/add_admin', function (req, res, next) {
    const schema_adminBodyData = {
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password
    }

    var data = schema_adminModel(schema_adminBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_adminBodyData);
            res.render('admin/add_admin');
        }
    });
});

/*Display Table of Admin */
router.get('/view_admin', function (req, res) {
    schema_adminModel.find(function (err, admin) {
        if (err)
            console.log(err);
        else
            res.render('admin/view_admin', { admins: admin });
    });
});

/*Get Delete Page of Admin */
router.get('/delete_admin/:id', function (req, res, next) {
    schema_adminModel.findByIdAndRemove(req.params.id, function (err, admin) {
        if (err) {
            console.log(err);
            res.redirect('../view_admin');
        }
        else
            res.redirect('../view_admin');
    });
});

/*Shows Single Admin Data */
router.get('/show_admin/:id', function (req, res, next) {
    schema_adminModel.findById(req.params.id, function (err, admin) {
        if (err)
            console.log(err);
        else {
            console.log(admin);
            res.render('admin/show_admin', { admins: admin });
        }
    });
});

// Edit Data of Admin.
/*Get Edit Page of Admin. */
router.get('/edit_admin/:id', function (req, res) {
    console.log(req.params.id);
    schema_adminModel.findById(req.params.id, function (err, admin) {
        if (err)
            console.log(err);
        else
            console.log(admin);
        res.render('admin/edit_admin', { admins: admin });
    });
});

/*Post Edit Page of Admin */
router.post('/edit_admin/:id', function (req, res) {
    const schema_adminBodyData = {
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password
    }

    schema_adminModel.findByIdAndUpdate(req.params.id, schema_adminBodyData, function (err) {
        if (err)
            res.redirect('admin/edit_admin/' + req.params.id);
        else
            res.redirect('../view_admin');
    });
});

module.exports = router;