var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');

var schema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Post', schema);
