var express = require('express');
var router = express.Router();
var Comment = require("../models/comment");
var Post = require("../models/post");



//Get Comments associated with Post
router.get('/:id', function(req, res, next){
    Post.findById(req.params.id, function(error, post){
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        Comment.find({post: post})
            .populate('post', '_id')
            .exec(function(error, comments){
                console.log(comments);
                if(error){
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: error
                    });
                }
                res.status(201).json({
                    message: 'Success',
                    obj: comments
                });
            });
    });
});




//Add Comment
router.post('/', function(req, res, next){
    console.log(req.body.postId);

    var comment = new Comment({
       content: req.body.content,
        post: req.body.postId
    });

    comment.save(function(error, result){
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        res.status(201).json({
            message: 'Saved Comment',
            obj: result
        });
    });

});

module.exports = router;