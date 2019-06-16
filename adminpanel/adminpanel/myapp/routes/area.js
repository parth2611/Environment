var express = require('express');
var router = express.Router();

var schema_areaModel = require('../schema/schema_area');
var schema_cityModel = require('../schema/schema_city');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET area Page. */
router.get('/add_area', function (req, res, next) {
    schema_cityModel.find(function (err, city) {
        if (err)
            console.log(err)
        else
            res.render('area/add_area', { cities: city });
    });
});

/* POST area Page. */
router.post('/add_area', function (req, res, next) {
    const schema_areaBodyData = {
        area_name: req.body.area_name,
        _city: req.body._city,
    };

    var data = schema_areaModel(schema_areaBodyData);;

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            res.redirect('/area/add_area');
        }
    });
});

/*Display table of area. */
router.get('/view_area', function (req, res) {
    schema_areaModel.find(function (err, area) {

        console.log(area);

        if (err)
            res.json({ message: 'There is no Cities.' });
        else {
            schema_areaModel.find({})
                .populate('_city')

                .exec(function (err, area) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(area);
                        res.render('area/display_area', { areas: area });
                    }
                });
        }
    });
});

/*Get Delete Page of area */
router.get('/deletearea/:id', function (req, res, next) {
    schema_areaModel.findByIdAndRemove(req.params.id, function (err, area) {
        if (err) {
            console.log(err);
            res.redirect('../view_area');
        }
        else
            res.redirect('../view_area');
    });
});

/*Shows Single area Data */
router.get('/show_area/:id', function (req, res, next) {
    schema_areaModel.findById(req.params.id, function (err, area) {

        console.log(area);
        if (err)
            res.json({ message: 'There is no Cities.' });
        else {
            schema_areaModel.findById(req.params.id)
                .populate('_city')

                .exec(function (err, area) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(area);
                        res.render('area/show_area', { areas: area });
                    }
                });
        }
    });
});

/*Get Edit Page of area. */
router.get('/edit_area/:id', function (req, res) {
    console.log(req.params.id);
    schema_areaModel.findById(req.params.id, function (err, area) {
        if (err)
            console.log(err);
        else
            console.log(area);
        res.render('area/edit_area', { areas: area });
    });
});

/*Post Edit Page of area */
router.post('/edit_area/:id', function (req, res) {
    const schema_areaBodyData = {
        area_name: req.body.area_name
    };

    schema_areaModel.findByIdAndUpdate(req.params.id, schema_areaBodyData, function (err) {
        if (err)
            res.redirect('area/edit_area/' + req.params.id);
        else
            res.redirect('../view_area');
    });
});

module.exports = router;