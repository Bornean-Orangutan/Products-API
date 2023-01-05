const express = require('express');
const compression = require('compression')
const { Product, Feature, Style, Photo, Sku, Related } = require('./database.js');
const { Op } = require("sequelize");

const app = express();
const port = 3002;

app.use(compression())

app.get('http://ec2-3-131-93-227.us-east-2.compute.amazonaws.com/loaderio-5128638a56aa1d549a3663421a6ecfc0.txt', (req, res) => {
  res.send('loaderio-5128638a56aa1d549a3663421a6ecfc0');
})

app.get('/products/', (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  let ids = [];
  for (var i = 1; i <= (page * count); i++) {
    ids.push({id: i});
  }

  Product.findAll({
    where: {
      [Op.or]: ids
    }
  })
    .then((products) => {
      res.send(products);
    })
})

app.get('/products/:product_id', (req, res) => {
  Product.findAll({
    where: { id: req.params.product_id },
    attributes: ['id', 'name', 'slogan', 'description', 'category', 'default_price'],
    include: [{
      model: Feature,
      attributes: ['feature', 'value']
    }]
  })
    .then((product) => {
      res.send(product);
    })
})

app.get('/products/:product_id/styles', (req, res) => {
  Style.findAll({
    where: { ProductId: req.params.product_id },
    attributes: [['id', 'style_id'], 'name', 'original_price', 'sale_price', ['default', 'default?']],
    include: [{
      model: Photo,
      attributes: ['thumbnail_url', 'url']
    }, {
      model: Sku,
      attributes: ['id', 'quantity', 'size']
    }]
  })
    .then((styles) => {
      res.send({ "product_id": req.params.product_id, "results": styles});
    })
})

app.get('/products/:product_id/related', (req, res) => {
  Related.findAll({ where: { current_product_id: req.params.product_id }, attributes: ['related_product_id']})
    .then((products) => {
      res.send(products.map((product) => product.related_product_id));
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})