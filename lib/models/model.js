'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    try {
      let recordToSave = new this.schema(record);
      let result = await recordToSave.save();
      return result;
    } catch(e) {
      return {status: 'Validation Error', message: 'Invalid Data Structure'}
    }
  }

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

  async update(_id, record) {
    try {
      await this.schema.findOneAndUpdate({_id}, record);
      let updatedRecord = await this.read(_id);
      return updatedRecord;
    } catch(e) {
      return {status: 'Error', message: 'Could not update record'}
    }
  }

  async delete(_id) {
    try {
      await this.schema.deleteOne({_id});
      return _id;
    } catch(e) {
      return {status: 'Error', message: 'Could not delete item'}
    }
  }


}

module.exports = Model;