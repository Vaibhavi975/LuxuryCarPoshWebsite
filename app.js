const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/luxurycarposhwebsite', {
    // These options are deprecated and can be removed in Mongoose 4.0.0+.
    // It's good practice to remove them, but they aren't causing the timeout.
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    // THIS BLOCK RUNS ONLY AFTER MONGODB CONNECTION IS SUCCESSFUL
    console.log('MongoDB Connected!'); // Optional: confirm connection in console

    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); // Essential for AJAX requests
    app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Routes
    const mainRoutes = require('./routes/index');
    const productsRoutes = require('./routes/products'); // <--- UNCOMMENTED
    const adminRoutes = require('./routes/admin');       // <--- UNCOMMENTED
    const servicesRoutes = require('./routes/services'); // <--- UNCOMMENTED
    const cartRoutes = require('./routes/cart');         // <--- NEW: Require your cart route

    app.use('/', mainRoutes);
    app.use('/products', productsRoutes); // <--- UNCOMMENTED
    app.use('/admin', adminRoutes);       // <--- UNCOMMENTED
    app.use('/services', servicesRoutes); // <--- UNCOMMENTED
    app.use('/cart', cartRoutes);         // <--- NEW: Use the cart route


    // Start the server ONLY after MongoDB is connected
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => {
    // THIS BLOCK RUNS IF MONGODB CONNECTION FAILS
    console.error('MongoDB connection error:', err);
    // You might want to exit the process here if the database is critical
    process.exit(1);
});