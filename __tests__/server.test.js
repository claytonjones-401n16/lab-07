'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const categoriesSchema = require('../lib/models/categories-schema.js');
const productsSchema = require('../lib/models/products-schema.js');
const Model = require('../lib/models/model.js');

const CategoriesModel = new Model(categoriesSchema);
const ProductsModel = new Model(productsSchema);

beforeAll(async () => {
  await CategoriesModel.create({
    "name": "Test 1"
  });

  await CategoriesModel.create({
    "name": "Test 2"
  });

  await ProductsModel.create({
    "name": "Product 1",
    "category": "Category 1"
  });

  await ProductsModel.create({
    "name": "Product 2",
    "category": "Category 2"
  });
});

const mockRequest = supergoose(app.server);

describe('categories routes works', () => {
  it('can get all categories', async () => {
    let results = await mockRequest.get('/api/v1/categories');
    expect(results.body.count).toStrictEqual(2);
    expect(results.status).toStrictEqual(200);
  });

  it('can get one category', async () => {
    let allCategories = await mockRequest.get('/api/v1/categories');
    let firstID = allCategories.body.results[0]._id;
    let oneCategory = await mockRequest.get(`/api/v1/categories/${firstID}`);

    expect(oneCategory.body.name).toStrictEqual('Test 1');
  });

  it('can post to categories', async () => {
    let results = await mockRequest.post('/api/v1/categories').send({"name": "Test 3"});

    expect(results.body.name).toStrictEqual('Test 3');
  });

  it('can update a category', async () => {
    let allCategories = await mockRequest.get('/api/v1/categories');
    let firstID = allCategories.body.results[0]._id;

    let results = await mockRequest.put(`/api/v1/categories/${firstID}`).send({"name": "Updated"});
    expect(results.body.name).toStrictEqual('Updated');
  });

  it('can delete from categories', async () => {
    let allCategories = await mockRequest.get('/api/v1/categories');
    let firstID = allCategories.body.results[0]._id;
    let results = await mockRequest.delete(`/api/v1/categories/${firstID}`);

    expect(results.text).toBe(firstID);
  });
});

describe('products categories routes work', () => {
  it('can get all products', async () => {

  });

  it('can post to products', async () => {

  });

  it('can update products', async () => {

  });

  it('can delete from products', async () => {

  });
});