'use strict';

const express = require('express');
const router = express.Router();
const productsSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductsModel = new Model(productsSchema);

/**
 * This route allows you to get all products
 * @route GET /api/v1/products
 * @group products
 * @returns {object} 200 - An object containing the number of items and an array of results
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('', async (req, res, next) => {
  let results = await ProductsModel.read();
  let count = results.length;

  res.send({ count, results });
});

/**
 * This route allows you to get a single product
 * @route GET /api/v1/products/:id
 * @group products
 * @returns {object} 200 - An object containing one products
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('/:id', async (req, res, next) => {
  let results = await ProductsModel.read(req.params.id);
  if(results.status) res.status(404).send(results);
  else res.send(results);
});

/**
 * This route allows you to save a product
 * @route POST /api/v1/products
 * @group products
 * @returns {object} 200 - An object containing the product saved
 * @returns {Error} - If there was an issue saving to the db
 */

router.post('', async (req, res, next) => {
  let results = await ProductsModel.create(req.body);
  if(results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to update a single product
 * @route PUT /api/v1/products/:id
 * @group products
 * @returns {object} 200 - An object containing the product updated
 * @returns {Error} - If there was an issue updating the db
 */

router.put('/:id', async (req, res, next) => {
  let results = await ProductsModel.update(req.params.id, req.body);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to delete a single product
 * @route DELETE /api/v1/products/:id
 * @group products
 * @returns {string} 200 - The ID of the deleted product
 * @returns {Error} - If there was an issue deleting from the db
 */

router.delete('/:id', async (req, res, next) => {
  let results = await ProductsModel.delete(req.params.id);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});

module.exports = router;