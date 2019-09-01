const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
router.post('/create', product_controller.create);
router.get('/all', product_controller.findAll);
router.get('/find/:productId', product_controller.findOne);
router.put('/update/:productId', product_controller.update);
router.delete('/delete/:productId', product_controller.delete);
module.exports = router;