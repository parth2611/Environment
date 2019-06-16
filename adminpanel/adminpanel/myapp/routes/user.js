var express = require('express');
var router = express.Router();

var schema_userModel = require('../schema/schema_user');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of user.
/*GET user Page. */
router.get('/add_user', function (req, res, next) {
    res.render('user/add_user');
});

/* POST user Page. */
router.post('/add_user', function (req, res, next) {
    const schema_userBodyData = {
        user_email: req.body.user_email,
        user_password: req.body.user_password
    }

    var data = schema_userModel(schema_userBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_userBodyData);
            res.render('user/add_user');
        }
    });
});

/*Display Table of user */
router.get('/view_user', function (req, res) {
    schema_userModel.find(function (err, user) {
        if (err)
            console.log(err);
        else
            res.render('user/view_user', { users: user });
    });
});

/*Get Delete Page of user */
router.get('/delete_user/:id', function (req, res, next) {
    schema_userModel.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('../view_user');
        }
        else
            res.redirect('../view_user');
    });
});

/*Shows Single user Data */
router.get('/show_user/:id', function (req, res, next) {
    schema_userModel.findById(req.params.id, function (err, user) {
        if (err)
            console.log(err);
        else {
            console.log(user);
            res.render('user/show_user', { users: user });
        }
    });
});

// Edit Data of user.
/*Get Edit Page of user. */
router.get('/edit_user/:id', function (req, res) {
    console.log(req.params.id);
    schema_userModel.findById(req.params.id, function (err, user) {
        if (err)
            console.log(err);
        else
            console.log(user);
        res.render('user/edit_user', { users: user });
    });
});

/*Post Edit Page of user */
router.post('/edit_user/:id', function (req, res) {
    const schema_userBodyData = {
        user_email: req.body.user_email,
        user_password: req.body.user_password
    }

    schema_userModel.findByIdAndUpdate(req.params.id, schema_userBodyData, function (err) {
        if (err)
            res.redirect('user/edit_user/' + req.params.id);
        else
            res.redirect('../view_user');
    });
});

module.exports = router;