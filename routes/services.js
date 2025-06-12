// routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Assuming you have a Service model

// GET /services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find(); // Fetches all service documents
        res.render('services', { services: services }); // Renders views/services.ejs
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).send('Error fetching services from the database.');
    }
});

module.exports = router;