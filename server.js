const express = require('express');
const mongoose = require('mongoose');
const Product = require('./schema'); // Import the Product model from schema.js
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// let products = [
//   { id: 1, name: 'Product 1', price: 10 },
//   { id: 2, name: 'Product 2', price: 20 },
//   { id: 3, name: 'Product 3', price: 30 }
// ];

mongoose.connect('mongodb://localhost:27017/productdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Endpoint to get all products
app.get('/products', (req, res) => {
  res.json(products);
});
// Endpoint to add a new product
app.post('/products', (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint to get a product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Endpoint to update a product by ID
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }

});

// Endpoint to delete a product by ID
app.delete('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        products = products.filter(p => p.id !== parseInt(req.params.id));
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});