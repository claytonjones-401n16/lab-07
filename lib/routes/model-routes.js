'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/model-finder.js');

router.param('model', modelFinder);

/**
 * This route allows you to get all data from a collection
 * @route GET /api/v1/:model
 * @group model
 * @returns {object} 200 - An object containing the number of items and an array of results
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('/:model', async (req, res, next) => {
  try {
    let results = await req.collectionModel.read();
    let count = results.length;
  
    res.send({ count, results });
  } catch(e) {
    res.send('Error on GET');
  }
});

/**
 * This route allows you to get a single piece of data from a collection
 * @route GET /api/v1/:model/:id
 * @group model
 * @returns {object} 200 - An object containing one item from the collection
 * @returns {Error} - If there was an issue retrieving from the db
 */

router.get('/:model/:id', async (req, res, next) => {
  let results = await req.collectionModel.read(req.params.id);
  if (results.status) res.status(404).send(results);
  else res.send(results);
});

/**
 * This route allows you to save to a collection
 * @route POST /api/v1/:model
 * @group model
 * @returns {object} 200 - The object that was created
 * @returns {Error} - If there was an issue saving to the db
 */

router.post('/:model', async (req, res, next) => {
  let results = await req.collectionModel.create(req.body);
  if(results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to update a piece of data in a collection
 * @route PUT /api/v1/:model/:id
 * @group model
 * @returns {object} 200 - The updated data object
 * @returns {Error} - If there was an issue updating the db
 */

router.put('/:model/:id', async (req, res, next) => {
  let results = await req.collectionModel.update(req.params.id, req.body);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});

/**
 * This route allows you to delete a single piece of data from a collection
 * @route DELETE /api/v1/:model/:id
 * @group model
 * @returns {String} 200 - The ID of the data deleted
 * @returns {Error} - If there was an issue deleting from the db
 */

router.delete('/:model/:id', async (req, res, next) => {
  let results = await req.collectionModel.delete(req.params.id);
  if (results.status) res.status(400).send(results);
  else res.send(results);
});


module.exports = router;