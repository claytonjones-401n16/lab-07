'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {}

  async read(_id) {
    try {
      if (_id) {
        let record = await this.schema.findOne({_id});
        if (!record) return {status: 'Error', message: "ID not found"}
        return record;
      } else {
        let records = await this.schema.find();
        return records;
      }
    } catch(e) {
      return {status: 'Error', message: "Invalid ID"};
    }
  }

  async update(_id) {}

  async delete(_id) {}


}

module.exports = Model;