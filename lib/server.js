'use strict';

const express = require('express');

const data = require('../db.json');
const notFound = require('./middleware/404.js');
// const timestamp = require('./middleware/timestamp.js');
// const logger = require('./middleware/logger.js');
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
// app.use(timestamp);
// app.use(logger);


/**
 * This route gives you a standard "HomePage" message
 * @route GET /
 * @group homepage
 * @returns {object} 200 - The string HomePage
 */
app.get('/', (req, res, next) => {
  res.status(200).send('HomePage');
});

/**
 * This route allows you to create a category
 * @route POST /categories
 * @group categories
 * @returns {object} 201 - The created object
 * @returns {Error} - If there was an issue adding to the db
 */

app.post('/categories', (req, res, next) => {
  let newCategory = req.body;
  newCategory.id = data.categories.length + 1;

  data.categories.push(newCategory);

  res.status(201).send(newCategory);
});







// app.put('/categories/:id', (req, res, next) => {
//   let id = parseInt(req.params.id);

//   if(data.categories[id - 1]) {
//     data.categories[id - 1] = {...req.body, id};
  
//     res.status(200).send(data.categories[id - 1]);
//   } else {
//     res.status(404).send('ID not found');
//   }
// });




// app.delete('/categories/:id', (req, res, next) => {
//   let id = parseInt(req.params.id);
//   if (data.categories[id - 1]) {
//     data.categories.splice(id - 1, 1);
  
//     res.status(200).send('Deletion Successful');
//   } else {
//     res.status(404).send('ID not found');
//   }
// });



// app.post('/products', (req, res, next) => {
//   let newProduct = req.body;
//   newProduct.id = data.products.length + 1;

//   data.products.push(newProduct);

//   res.status(201).send(newProduct);
// });



// app.get('/products', (req, res, next) => {
//   res.send(data.products);
// });



// app.put('/products/:id', (req, res, next) => {
//   let id = parseInt(req.params.id);

//   if(data.products[id - 1]) {
//     data.products[id - 1] = {...req.body, id};
  
//     res.status(200).send(data.products[id - 1]);
//   } else {
//     res.status(404).send('ID not found');
//   }
// });



// app.delete('/products/:id', (req, res, next) => {
//   let id = parseInt(req.params.id);
//   if (data.products[id - 1]) {
//     data.products.splice(id - 1, 1);
  
//     res.status(200).send('Deletion Successful');
//   } else {
//     res.status(404).send('ID not found');
//   }

// });


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