'use strict';

const express = require('express');
const router = express.Router();
const categoriesSchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categoriesSchema);

router.get('', async (req, res, next) => {
  let results = await CategoriesModel.read();
  let count = results.length;

  res.send({ count, results });
});

router.get('/:id', async (req, res, next) => {
  let results = await CategoriesModel.read(req.params.id);
  if (results.status) res.status(404).send(results);
  else res.send(results);
});

router.post('', async (req, res, next) => {
  let results = await CategoriesModel.create(req.body);
  if(results.status) res.status(400).send(results);
  else res.send(results);
});

module.exports = router;