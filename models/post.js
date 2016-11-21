var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');

var schema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true}
});

module.exports = mongoose.model('Post', schema);
