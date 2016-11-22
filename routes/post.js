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

//Get Individual Post
router.get('/:id', function(req, res, next){
    console.log(req.params.id);
    Post.findById(req.params.id, function(error, post){
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        if(!post){
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'No post found'}
            });
        }
            res.status(201).json({
                message: 'Found Post',
                obj: post
            });
    })
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
           message: 'Saved Post',
            obj: result
        });
    });

});

//Update Post
router.patch('/:id', function(req, res, next){
    Post.findById(req.params.id, function(error, post){
        console.log(req.params.id);
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        if(!post){
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'No post found'}
            });
        }
        post.title = req.body.title;
        post.content = req.body.content;
        post.save(function(error, result){
            if(error){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            res.status(201).json({
                message: 'Updated Post',
                obj: result
            });
        });
    })
});


//Delete Post
router.delete('/:id', function(req, res, next){
    Post.findById(req.params.id, function(error, post){
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        if(!post){
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'No post found'}
            });
        }

        post.remove(function(error, result){
            if(error){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            res.status(201).json({
                message: 'Deleted Post',
                obj: result
            });
        });
    })
});

module.exports = router;