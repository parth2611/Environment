var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var event_schema = new Schema({
    Event_id : Number, 
    Event_Title : String,
    Event_Details : String,
    User_id : String
});

module.exports = mongoose.model('event', event_schema);
