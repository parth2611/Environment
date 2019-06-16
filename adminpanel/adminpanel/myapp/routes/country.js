var express = require('express');
var router = express.Router();

var schema_countryModel = require('../schema/schema_country');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET country Page. */
router.get('/add_country', function (req, res, next) {
    res.render('country/add_country');
});

/* POST country Page. */
router.post('/add_country', function (req, res, next) {
    const schema_countryBodyData = {
        country_name: req.body.country_name
    };

    var data = schema_countryModel(schema_countryBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
            res.render('country/add_country');
        }
        else {
            console.log(req.body);
            res.render('country/add_country');
        }
    });
});

/*Display table of country. */
router.get('/view_country', function (req, res) {
    schema_countryModel.find(function (err, country) {
        if (err)
            console.log(err);
        else
            res.render('country/view_country', { countries: country });
    });
});

/*Get Delete Page of country */
router.get('/delete_country/:id', function (req, res, next) {
    schema_countryModel.findByIdAndRemove(req.params.id, function (err, country) {
        if (err) {
            console.log(err);
            res.redirect('../view_country');
        }
        else
            res.redirect('../view_country');
    });
});

/*Shows Single country Data */
router.get('/show_country/:id', function (req, res, next) {
    schema_countryModel.findById(req.params.id, function (err, country) {
        if (err)
            console.log(err);
        else {
            console.log(country);
            res.render('country/show_country', { countries: country });
        }
    });
});

/*Get Edit Page of country. */
router.get('/edit_country/:id', function (req, res) {
    console.log(req.params.id);
    schema_countryModel.findById(req.params.id, function (err, country) {
        if (err)
            console.log(err);
        else
            console.log(country);
        res.render('country/edit_country', { countries: country });
    });
});

/*Post Edit Page of country */
router.post('/edit_country/:id', function (req, res) {
    const schema_countryBodyData = {
        country_name: req.body.country_name
    };

    schema_countryModel.findByIdAndUpdate(req.params.id, schema_countryBodyData, function (err) {
        if (err)
            res.redirect('country/edit_country/' + req.params.id);
        else
            res.redirect('../view_country');
    });
});

module.exports = router;