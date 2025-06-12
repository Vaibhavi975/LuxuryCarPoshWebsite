const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});

module.exports = mongoose.model('Service', serviceSchema);