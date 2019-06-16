var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var etimeline_schema = new Schema({
    E_id : Number,
    Admin_id : Number,
    E_Details : String
});

module.exports = mongoose.model('etimeline', etimeline_schema);
