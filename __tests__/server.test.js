'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('categories routes works', () => {
  it('can get categories', async () => {
    let response = await mockRequest.get('/categories');

    expect(response.body).toStrictEqual([
      {
        "id": 1,
        "name": "components"
      },
      {
        "name": "electronics",
        "id": 2
      }
    ]);
  });

  it('can post to categories', async () => {
    let newCategory = { "name": "hardware" };

    let response = await mockRequest.post('/categories').send(newCategory);

    expect(response.body).toStrictEqual({"name": "hardware", "id": 3});
    expect(response.status).toStrictEqual(201);
  });

  it('can update a category', async () => {
    let updatedCategory = { "name": "COMPONENTS" };
    let response = await mockRequest.put('/categories/1').send(updatedCategory);

    expect(response.body).toStrictEqual({"id": 1, "name": "COMPONENTS"});
    expect(response.status).toStrictEqual(200);
  });

  it('can delete from categories', async () => {
    let response = await mockRequest.delete('/categories/1');
    expect(response.status).toStrictEqual(200);
  });
});

describe('products categories routes work', () => {
  it('can get products', async () => {
    let response = await mockRequest.get('/products');
    expect(response.body).toStrictEqual([
      {
        "id": 1,
        "category": "components",
        "name": "Intel Core i7-9000k CPU"
      },
      {
        "id": 2,
        "category": "components",
        "name": "RTX 2080 TI GPU"
      },
      {
        "name": "MOTHERBOARD",
        "category": "components",
        "id": 3
      }
    ]);
    expect(response.status).toStrictEqual(200);
  });

  it('can post to products', async () => {
    let newProduct = { "name": "PRODUCT", "category": "CATEGORY" };
    let response = await mockRequest.post('/products').send(newProduct);

    expect(response.body).toStrictEqual({ "name": "PRODUCT", "category": "CATEGORY", "id": 4 });
    expect(response.status).toStrictEqual(201);

  });

  it('can update products', async () => {
    let updatedProduct = { "name": "UPDATED", "category": "UPDATED" };
    let response = await mockRequest.put('/products/1').send(updatedProduct);

    expect(response.body).toStrictEqual({ "name": "UPDATED", "category": "UPDATED", "id": 1 });
    expect(response.status).toStrictEqual(200);
  });

  it('can delete from products', async () => {
    let response = await mockRequest.delete('/products/1');
    expect(response.status).toStrictEqual(200);
  });
});