const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


//allows user to sign up for an account
router.post('/signup', (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60*60*24
            })
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        }, 
        createError = err => res.send(500, err)
    )
});

//allows user to login to their account
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn: 60*60*24
                    })
                    res.json({
                        user: user,
                        message: 'login success',
                        sessionToken: token
                    })
                }else {
                    res.status(502).send({error: 'bad gateway'})
                }      
            })
        }else {
            res.status(500).send({error: "failed to authenticate"})
        }
    }, err => status(501).send({error: 'failed to process'}))
})

module.exports = router;