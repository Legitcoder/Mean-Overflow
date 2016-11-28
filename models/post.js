var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');

var schema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});



schema.post('remove', function(post){
    User.findById(post.user, function(err, user){
        user.posts.pull(post);
        user.save();
    });
});

module.exports = mongoose.model('Post', schema);
