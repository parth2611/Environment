var express = require('express');
var router = express.Router();

var schema_eventModel = require('../schema/schema_event');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of event.
/*GET event Page. */
router.get('/add_event', function (req, res, next) {
    res.render('event/add_event');
});

/* POST event Page. */
router.post('/add_event', function (req, res, next) {
    const schema_eventBodyData = {
        event_email: req.body.event_email,
        event_password: req.body.event_password
    }

    var data = schema_eventModel(schema_eventBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(schema_eventBodyData);
            res.render('event/add_event');
        }
    });
});

/*Display Table of event */
router.get('/view_event', function (req, res) {
    schema_eventModel.find(function (err, event) {
        if (err)
            console.log(err);
        else
            res.render('event/view_event', { events: event });
    });
});

/*Get Delete Page of event */
router.get('/delete_event/:id', function (req, res, next) {
    schema_eventModel.findByIdAndRemove(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.redirect('../view_event');
        }
        else
            res.redirect('../view_event');
    });
});

/*Shows Single event Data */
router.get('/show_event/:id', function (req, res, next) {
    schema_eventModel.findById(req.params.id, function (err, event) {
        if (err)
            console.log(err);
        else {
            console.log(event);
            res.render('event/show_event', { events: event });
        }
    });
});

// Edit Data of event.
/*Get Edit Page of event. */
router.get('/edit_event/:id', function (req, res) {
    console.log(req.params.id);
    schema_eventModel.findById(req.params.id, function (err, event) {
        if (err)
            console.log(err);
        else
            console.log(event);
        res.render('event/edit_event', { events: event });
    });
});

/*Post Edit Page of event */
router.post('/edit_event/:id', function (req, res) {
    const schema_eventBodyData = {
        event_email: req.body.event_email,
        event_password: req.body.event_password
    }

    schema_eventModel.findByIdAndUpdate(req.params.id, schema_eventBodyData, function (err) {
        if (err)
            res.redirect('event/edit_event/' + req.params.id);
        else
            res.redirect('../view_event');
    });
});

module.exports = router;