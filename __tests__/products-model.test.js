'use strict';

const supergoose = require('@code-fellows/supergoose');
const productsSchema = require('../lib/models/products-schema.js');
const Model = require('../lib/models/model.js');

const ProductsModel = new Model(productsSchema);

beforeAll(async () => {
  await ProductsModel.create({
    "name": "TEST 1",
    "category": "TESTING"
  });

  await ProductsModel.create({
    "name": "TEST 2",
    "category": "TESTING"
  });
});

describe('Testing Categories CRUD operations', () => {
  it('can create a record', async () => {
    let newRecord = {
      "name": "NEW",
      "category": "TESTING"
    }
    let record = await ProductsModel.create(newRecord);

    expect(record.name).toStrictEqual('NEW');
    expect(record.category).toStrictEqual('TESTING');
    expect(record._id).toBeTruthy();
  });

  it('can read records', async () => {
    let allRecords = await ProductsModel.read();

    expect(allRecords.length).toStrictEqual(3);
  });

  it('can update records', async () => {
    let allRecords = await ProductsModel.read();
    let id = allRecords[0]._id;
    let update = {"name": "Updated", "category": "TESTING"};
    let updatedRecord = await ProductsModel.update(id, update);

    expect(updatedRecord.name).toStrictEqual('Updated');
  });

  it('can delete records', async () => {
    let allRecords = await ProductsModel.read();
    let id = allRecords[0]._id;

    let deletedID = await ProductsModel.delete(id);
    expect(deletedID).toStrictEqual(id);
  });
});