const express = require('express');
const models = require('./models')

const app = express();
const bodyParser = require('body-parser');

const port = 3000 | process.env;

models.sequelize.sync(() => {
   console.log('sequelized is syncing')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
   );
   next(); //without this like, the execute with stop
 });


app.get('/', (req, res, next) => {
   models.Blog
      .findAll()
      .then(blogs => {
         res.status(200).json({blogs: blogs, message: 'request was successfull...'});
      })
})

app.post('/create', (req, res, next) => {
   console.log('reached post route...')
   const blog = req.body;
   console.log(blog);

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

app.listen(port, () => {
   console.log(`server running at port ${port}`)
});