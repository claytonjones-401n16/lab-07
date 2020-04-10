'use strict';

const express = require('express');
const router = express.Router();
const productsSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductsModel = new Model(productsSchema);

// base endpoint - /api/v1/categories

router.get('', async (req, res, next) => {

});

module.exports = router;