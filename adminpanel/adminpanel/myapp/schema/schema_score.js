var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var score_schema = new Schema({
    Score_id : Number,
    Earned_Score : Number,
    User_id : Number
});

module.exports = mongoose.model('score', score_schema);
