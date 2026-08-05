const express = require('express');
const router = express.Router();
const { getProducts, getCategories } = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products with filtering (category, price, rating) and sorting
router.get('/products', getProducts);

// @route   GET /api/categories
// @desc    Get list of available categories
router.get('/categories', getCategories);

module.exports = router;
