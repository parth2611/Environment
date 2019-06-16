var express = require('express');
var router = express.Router();

var schema_cityModel = require('../schema/schema_city');
var schema_stateModel = require('../schema/schema_state');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET city Page. */
router.get('/add_city', function (req, res, next) {
    schema_stateModel.find(function (err, state) {
        if (err)
            console.log(err)
        else
            res.render('city/add_city', { states: state });
    })
});

/* POST city Page. */
router.post('/add_city', function (req, res, next) {

    const schema_cityBodyData = {
        city_name: req.body.city_name,
        _state: req.body._state,
    };

    var data = schema_cityModel(schema_cityBodyData);;

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            res.redirect('/city/add_city');
        }
    });
});

/*Display table of city. */
router.get('/view_city', function (req, res) {
    schema_cityModel.find(function (err, city) {
        console.log(city);

        if (err)
            res.json({ message: 'There is no States.' });
        else {
            schema_cityModel.find({})
                .populate('_state')

                .exec(function (err, city) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(city);
                        res.render('city/display_city', { cities: city });
                    }
                });
        }
    });
});

/*Get Delete Page of city */
router.get('/delete_city/:id', function (req, res, next) {
    schema_cityModel.findByIdAndRemove(req.params.id, function (err, city) {
        if (err) {
            console.log(err);
            res.redirect('../view_city');
        }
        else
            res.redirect('../view_city');
    });
});

/*Shows Single city Data */
router.get('/show_city/:id', function (req, res, next) {
    schema_cityModel.findById(req.params.id, function (err, city) {
        console.log(city);

        if (err)
            res.json({ message: 'There is no States.' });
        else {
            schema_cityModel.findById(req.params.id)
                .populate('_state')

                .exec(function (err, city) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(city);
                        res.render('city/show_city', { cities: city });
                    }
                });
        }
    });
});

/*Get Edit Page of city. */
router.get('/edit_city/:id', function (req, res) {
    console.log(req.params.id);
    schema_cityModel.findById(req.params.id, function (err, city) {
        if (err)
            console.log(err);
        else
            console.log(city);
        res.render('city/edit_city', { cities: city });
    });
});

/*Post Edit Page of city */
router.post('/edit_city/:id', function (req, res) {
    const schema_cityBodyData = {
        city_name: req.body.city_name
    };

    schema_cityModel.findByIdAndUpdate(req.params.id, schema_cityBodyData, function (err) {
        if (err)
            res.redirect('city/edit_city/' + req.params.id);
        else
            res.redirect('../view_city');
    });
});

module.exports = router;