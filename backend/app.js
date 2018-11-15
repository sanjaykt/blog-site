const express = require('express');
const models = require('./models')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')

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

 app.use(blogRoutes);
 app.use(userRoutes);



app.listen(port, () => {
   console.log(`server running at port ${port}`)
});