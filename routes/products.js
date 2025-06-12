// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Make sure the path to your Product model is correct

// GET /products
// This route will fetch all products from the database and render the products.ejs view.
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetches all product documents from the 'products' collection
        res.render('products', { products: products }); // Renders views/products.ejs, passing the fetched products
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products from the database.');
    }
});

// You can add other product-related routes here, for example:
// router.get('/:id', async (req, res) => { ... view single product ... });
// router.post('/add', async (req, res) => { ... add new product ... });

module.exports = router; // This line is crucial for app.js to use this router