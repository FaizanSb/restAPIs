const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
];

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

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});