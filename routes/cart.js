// routes/cart.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure this path is correct for your Product model
const Service = require('../models/Service'); // <--- NEW: Require your Service model

router.post('/add', async (req, res) => {
    // We'll consistently use 'productId' as the hidden input name in EJS for both products and services
    const itemId = req.body.productId;
    console.log('Received add to cart request for item ID:', itemId);

    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is missing.' });
    }

    try {
        let itemToAdd = null;
        let itemType = '';

        // --- Start: Logic to find item as Product OR Service ---
        // First, try to find it as a Product
        itemToAdd = await Product.findById(itemId);
        if (itemToAdd) {
            itemType = 'Product';
        } else {
            // If not found as a Product, try to find it as a Service
            itemToAdd = await Service.findById(itemId);
            if (itemToAdd) {
                itemType = 'Service';
            }
        }
        // --- End: Logic to find item as Product OR Service ---

        if (!itemToAdd) {
            // If it's neither a Product nor a Service with that ID
            return res.status(404).json({ message: 'Item not found in products or services database.' });
        }

        // Initialize cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if item already in cart
        // Ensure you're comparing against 'itemId' property in cart objects (which stores _id)
        const existingItemIndex = req.session.cart.findIndex(item => item.itemId.toString() === itemId);

        if (existingItemIndex > -1) {
            // Item exists, increase quantity
            req.session.cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            req.session.cart.push({
                itemId: itemToAdd._id, // Use itemId to be generic
                name: itemToAdd.name,
                price: itemToAdd.price,
                quantity: 1,
                type: itemType // Store the type (Product or Service) for display later
            });
        }

        console.log('Current cart:', req.session.cart);
        // Send a response back to the client with a dynamic message
        res.json({ message: `${itemType} added to cart successfully!`, cart: req.session.cart });

    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart.' });
    }
});

module.exports = router;