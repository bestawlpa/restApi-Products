const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');


router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get('/:product_id', async (req, res, next) => {
    try {
        const productId = await Product.findOne({ product_id: req.params.product_id });
        res.json(productId)
    } catch (error) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const post = await Product.create(req.body)
        res.json(post);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: deleteProduct });
    } catch (error) {
        next(error);
    }
});

module.exports = router