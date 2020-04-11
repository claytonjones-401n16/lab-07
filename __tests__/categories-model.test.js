'use strict';

const supergoose = require('@code-fellows/supergoose');
const categoriesSchema = require('../lib/models/categories-schema.js');
const Model = require('../lib/models/model.js');

const CategoriesModel = new Model(categoriesSchema);

beforeAll(async () => {
  await CategoriesModel.create({
    "name": "TEST 1"
  });

  await CategoriesModel.create({
    "name": "TEST 2"
  });
});

describe('Testing Categories CRUD operations', () => {
  it('can create a record', async () => {
    let newRecord = {
      "name": "NEW"
    }
    let record = await CategoriesModel.create(newRecord);

    expect(record.name).toStrictEqual('NEW');
    expect(record._id).toBeTruthy();
  });

  it('can read records', async () => {
    let allRecords = await CategoriesModel.read();

    expect(allRecords.length).toStrictEqual(3);
  });

  it('can update records', async () => {
    let allRecords = await CategoriesModel.read();
    let id = allRecords[0]._id;
    let update = {"name": "Updated"};
    let updatedRecord = await CategoriesModel.update(id, update);

    expect(updatedRecord.name).toStrictEqual('Updated');
  });

  it('can delete records', async () => {
    let allRecords = await CategoriesModel.read();
    let id = allRecords[0]._id;

    let deletedID = await CategoriesModel.delete(id);
    expect(deletedID).toStrictEqual(id);
  });
});