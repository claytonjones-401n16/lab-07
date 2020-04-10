'use strict';

const express = require('express');
const router = express.Router();
const categoriesSchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categoriesSchema);


/**
 * This route allows you to get an array of categories
 * @route GET /api/v1/categories
 * @group categories
 * @returns {object} 200 - An object containing the number of items and an array of results
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('', async (req, res, next) => {
  try {
    let results = await CategoriesModel.read();
    let count = results.length;
  
    res.send({ count, results });
  } catch(e) {
    res.send('Error on GET');
  }
});

/**
 * This route allows you to get a single category
 * @route GET /api/v1/categories/:id
 * @group categories
 * @returns {object} 200 - An object containing one category
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('/:id', async (req, res, next) => {
  let results = await CategoriesModel.read(req.params.id);
  if (results.status) res.status(404).send(results);
  else res.send(results);
});

/**
 * This route allows you to save a category
 * @route POST /api/v1/categories
 * @group categories
 * @returns {object} 200 - The object that was created
 * @returns {Error} - If there was an issue saving to the db
 */

router.post('', async (req, res, next) => {
  let results = await CategoriesModel.create(req.body);
  if(results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to update a category
 * @route PUT /api/v1/categories/:id
 * @group categories
 * @returns {object} 200 - The updated category
 * @returns {Error} - If there was an issue updating the db
 */

router.put('/:id', async (req, res, next) => {
  let results = await CategoriesModel.update(req.params.id, req.body);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to delete a category
 * @route DELETE /api/v1/categories/:id
 * @group categories
 * @returns {String} 200 - The ID of the category deleted
 * @returns {Error} - If there was an issue deleting from the db
 */

router.delete('/:id', async (req, res, next) => {
  let results = await CategoriesModel.delete(req.params.id);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});

module.exports = router;