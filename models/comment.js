var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');

var schema = new Schema({
    content: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model('Comment', schema);
