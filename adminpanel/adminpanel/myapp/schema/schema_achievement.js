var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievement_schema = new Schema({
    achievement_id : Number,
    user_Id : Number,
    achievement_detail : String,
    ach_date : Date
});

module.exports = mongoose.model(('achievement'), achievement_schema);
