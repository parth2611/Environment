var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admin_schema = new Schema({    
    admin_Email : String,
    admin_Password : String
});

module.exports = mongoose.model(('admin'),admin_schema);
