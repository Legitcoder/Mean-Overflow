var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    content: {type: String, require: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', schema);
