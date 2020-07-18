'use strict';

const Model = require('../models/model.js');
const categoriesSchema = require('../models/categories-schema.js');
const productsSchema = require('../models/products-schema.js');

const modelFinder = (req, res, next) => {
  console.log('In Model Finder');
  switch (req.params.model) {
    case 'categories':
      req.collectionModel = new Model(categoriesSchema);
      next();
      break;
    case 'products':
      req.collectionModel = new Model(productsSchema);
      next();
      break;
    default:
      res.status(404).end();
      break;
  }
}

module.exports = modelFinder;