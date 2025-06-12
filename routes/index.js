const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
router.use('/products', require('./products'));
router.use('/services', require('./services'));
router.use('/', require('./admin'));
