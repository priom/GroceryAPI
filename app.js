const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json({limit: '1mb'}));

Product = require('./models/product');

// connect mongoose
mongoose.connect('mongodb://localhost/productapi');

const db = mongoose.connection;

//home page
app.get('/', function (req, res) {
    res.send('Please use /api/products');
});

//products api
app.get('/api/products', function (req, res) {
    Product.getProducts(function (err, products) {
        if (err) { throw err; }
        res.json(products);
    });
});

//products api by ID
app.get('/api/products/:_id', function (req, res) {
    Product.getProductById(req.params._id, function (err, product) {
        if (err) { throw err; }
        res.json(product);
    });
});

//add product via api
app.post('/api/products', function (req, res) {
    const product = req.body;
    Product.addProduct(product, function (err, product) {
        if (err) { throw err; }
        res.json(product);
    });
});

//update product via api
app.put('/api/products/:_id', function (req, res) {
    const id = req.params._id;
    const product = req.body;
    Product.updateProduct(id, product, {}, function (err, product) {
        if (err) { throw err; }
        res.json(product);
    });
});

//delete product via api
app.delete('/api/products/:_id', function (req, res) {
    const id = req.params._id;
    Product.deleteProduct(id, function (err, product) {
        if (err) { throw err; }
        res.json(product);
    });
});

//
app.listen(4000);
console.log('running on port 4000');
