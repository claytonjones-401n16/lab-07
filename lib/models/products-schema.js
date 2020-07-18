'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: 'String', required: true},
  category: {type: 'String', required: true},
  stock: {type: 'Number', required: true},
  price: {type: 'Number', required: true},
  display_name: { type: String },
  description: { type: String }
});

const model = mongoose.model('products', schema);

module.exports = model;