var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user')
var jwt = require('jsonwebtoken');



//Save User on signup
router.post('/', function(req, res, next) {
    console.log(req.body);
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save(function(error, result){
       if(error){
           return res.status(500).json({
              title: 'An error occurred',
               error: error
           });
       }
       console.log(result);
       res.status(201).json({
           title: 'User Created',
           obj: result
       });

    });
});

router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(error, user){
        if(error){
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }

        if(!user){
            res.status(401).json({
                title: 'Login Failed',
                error: {message: 'invalid login credentials'}
            });
        }

        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(401).json({
                title: 'Login Failed',
                error: {message: 'invalid login credentials'}
            });
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
               message: 'Successfully logged in',
                token: token,
                userId: user._id
            });

    });
});




module.exports = router;
