const express = require('express');
const router = express.Router();
const models = require('../models');
const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
   models.Blog
      .findAll()
      .then(blogs => {
         res.status(200).json({blogs: blogs, message: 'GET request was successfull...'});
      })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  models.Blog
    .findById(id)
    .then((blog) => {
      res.status(200).json({blog: blog});
    })
})

router.post('/create', checkAuth, (req, res, next) => {
   models.Blog
      .create({
         title: req.body.title,
         subtitle: req.body.subtitle,
         content: req.body.content
      })
      .then(() => {
         console.log('successfully posted the blog')
   });

   res.json({
      message: 'you posted successfully...'
   })
})

router.put('/:id', checkAuth, (req, res, next) => {
  const id = req.params.id;
  models.Blog
    .findById(id)
    .then(blog => {
      blog.title = req.body.title,
      blog.subtitle = req.body.subtitle,
      blog.content = req.body.content,
      blog.save();
      res.status(201).json({
        message: 'notepad updated successfully...'
      })
  })
})

module.exports = router;