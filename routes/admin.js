const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Service = require('../models/Service');

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.post('/add-product', async (req, res) => {
    const { name, price, description } = req.body;
    await Product.create({ name, price, description });
    res.redirect('/products');
});

router.post('/add-service', async (req, res) => {
    const { name, price, description } = req.body;
    await Service.create({ name, price, description });
    res.redirect('/services');
});

module.exports = router;