var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitytype_schema = new Schema({
    
    Activity_Type_id : Number,
    Activity_Type : String

});

module.exports = mongoose.model('activitytype', activitytype_schema);
