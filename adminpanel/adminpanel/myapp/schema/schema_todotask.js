var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todotask_schema = new Schema({
    
    Post_id : Number,
    Post_Title : String,
    Post_Details : String,
    Type_id : Number,
    User_id : String,
    Post_Date : Date

});

module.exports = mongoose.model('todotask', todotask_schema);
