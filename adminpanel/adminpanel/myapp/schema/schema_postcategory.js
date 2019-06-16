var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postcategory_schema = new Schema({
    Type_id : Number,
    Type : String
});

module.exports = mongoose.model('postcategory', postcategory_schema);
