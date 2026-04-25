const express = require('express');
const mongoose = require('mongoose');
const Product = require('./schema'); // Import the Product model from schema.js
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect('mongodb://localhost:27017/productdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Endpoint to get all products
app.get('/products', async(req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
        
    }catch (err) {
        console.error("The error is ",err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Endpoint to add a new product
app.post('/products', async(req, res) => {
    try {
        const newProduct = new Product({ 
            name: req.body.name,
            price: req.body.price
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Endpoint to get a product by ID
app.get('/products/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to update a product by ID
app.put('/products/:id', async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, price: req.body.price },
            { returnDocument: 'after' }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }

    }catch (err) {
        res.status(500).json({ message: 'Server error' });
    }

});

// Endpoint to delete a product by ID
app.delete('/products/:id', async(req, res) => {
   try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
   } catch (err) {
    res.status(500).json({ message: 'Server error' });
   }
});

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});