var express = require('express');
var router = express.Router();
var Post = require('../models/post')


//Get Post
router.get('/', function(req, res, next){
    Post.find()
        .exec(function(error, posts){
            if(error){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            res.status(201).json({
                message: 'Success',
                obj: posts
            });
        });
});





//Add Post
router.post('/', function(req, res, next){
   var post = new Post({
       title: req.body.title,
       content: req.body.content
   });
    console.log(post);
    post.save(function(error, result){
        if(error){
            return res.status(500).json({
               title: 'An error occurred',
                error: error
            });
        }
        res.status(201).json({
           message: 'Saved message',
            obj: result
        });
    });

});

module.exports = router;