'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {}

  async read(_id) {}

  async update(_id) {}

  async delete(_id) {}


}

module.exports = Model;