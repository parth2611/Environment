var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedback_schema = new Schema({
    Feedback_id : Number,
    Feedback_Date : Date,
    Feedback_desc : String,
    User_id : String
});

module.exports = mongoose.model('feedback', feedback_schema);
