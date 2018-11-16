const express = require('express');
const router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
   bcrypt.hash(req.body.password, 10)
      .then(hash => {
         models.User
            .create({
               email: req.body.email,
               password: hash
            })
            .then(result => {
               res.status(201).send({
                  message: 'user is created',
                  user: result
               })
            })
            .catch(err => {
               res.status(500).send({
                  error: err
               })
            })
      })
})

router.post('/login', (req, res, next) => {
   let fetchedUser = {};
   models.User
      .findOne(
         {where: {email: req.body.email}}
      )
      .then(user => {
         console.log(req.body.email);
         fetchedUser = user;
         if(!user) {
            return res.status(401).send({
               message: 'Auth failed...'
            })
         }
         return bcrypt.compare(req.body.password, user.password)
      })
      .then(resutl => {
         if(!resutl) {
            return res.status(401).send({
               message: 'Auth failed...'
            })
         }
         const token = jwt.sign({email: fetchedUser.email, id: fetchedUser.id}, 'this-should-be-a-long-secreit-key', {expiresIn: '1h'});

         res.status(200).json({
            token: token,
            email: fetchedUser.email
         })
      })
      .catch(err => {
         res.status(401).send({
            message: 'Auth failed due to ' + err
         }) 
      })
})

module.exports = router;