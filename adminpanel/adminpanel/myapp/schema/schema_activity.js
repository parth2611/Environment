var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activity_schema = new Schema({
    Activity_id : Number, 
    Activity_Type_id : Number,
    User_id : String,
    Details : String
});

module.exports = mongoose.model(('activity'), activity_schema);
