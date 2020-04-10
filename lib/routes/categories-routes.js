'use strict';

const express = require('express');
const router = express.Router();
const categoriesSchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categoriesSchema);



module.exports = router;