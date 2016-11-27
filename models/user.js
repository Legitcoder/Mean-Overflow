var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('User', schema);
