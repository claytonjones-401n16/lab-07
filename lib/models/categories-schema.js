'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: 'String', required: true}
});

const model = mongoose.model('categories', schema);

module.exports = model;