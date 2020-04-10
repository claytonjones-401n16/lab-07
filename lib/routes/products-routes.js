'use strict';

const express = require('express');
const router = express.Router();
const productsSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductsModel = new Model(productsSchema);

// base endpoint - /api/v1/categories

router.get('', async (req, res, next) => {
  let results = await ProductsModel.read();
  let count = results.length;

  res.send({ count, results });
});

router.get('/:id', async (req, res, next) => {
  let results = await ProductsModel.read(req.params.id);
  if(results.status) res.status(404).send(results);
  else res.send(results);
});

module.exports = router;