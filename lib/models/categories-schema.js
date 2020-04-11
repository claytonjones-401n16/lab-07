'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: 'String', required: true},
  display_name: { type: String },
  description: { type: String }
});

const model = mongoose.model('categories', schema);

module.exports = model;