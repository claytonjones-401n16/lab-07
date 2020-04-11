'use strict';

const express = require('express');

const notFound = require('./middleware/404.js');
const generateSwagger = require('../docs/swagger.js');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const categoriesRouter = require('./routes/categories-routes.js');
const productsRouter = require('./routes/products-routes.js');

const app = express();

generateSwagger(app);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


/**
 * This route gives you a standard "HomePage" message
 * @route GET /
 * @group homepage
 * @returns {object} 200 - The string HomePage
 */

app.get('/', (req, res, next) => {
  res.status(200).send('HomePage');
});


app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/products', productsRouter);

app.use('*', notFound);


const serverStart = (port, mongodb) => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
  mongoose.connect(mongodb, options);
  
  app.listen(port, () => { console.log(`Server up and running on port ${port}.`); });
}

module.exports = {
  server: app,
  start: serverStart,
}