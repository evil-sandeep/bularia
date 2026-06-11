const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Mock data for fallback
let mockProducts = [
    {
        _id: "m1",
        name: "Sambalpuri Handloom Saree",
        description: "Authentic hand-woven Ikat saree from Sambalpur, featuring traditional patterns and premium silk.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
        category: "Apparel"
    },
    {
        _id: "m2",
        name: "Konark Stone Carving",
        description: "Handcrafted miniature of the famous Konark Sun Temple wheel, carved from soft stone.",
        price: 2400,
        image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=600",
        category: "Decor"
    },
    {
        _id: "m3",
        name: "Pattachitra Painting",
        description: "Traditional cloth-based scroll painting from Odisha, depicting mythological themes with natural colors.",
        price: 3200,
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=600",
        category: "Art"
    },
    {
        _id: "m4",
        name: "Silver Filigree Earring",
        description: "Exquisite Cuttack Tarakasi (Silver Filigree) jewelry, featuring delicate craftsmanship.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    }
];

// Get all products
router.get('/products', async (req, res) => {
    try {
        if (req.isUsingMongoDB) {
            const products = await Product.find();
            res.json(products);
        } else {
            res.json(mockProducts);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed data
router.get('/seed', async (req, res) => {
    try {
        if (req.isUsingMongoDB) {
            await Product.deleteMany({});
            const createdProducts = await Product.insertMany(mockProducts.map(p => {
                const { _id, ...rest } = p;
                return rest;
            }));
            res.json(createdProducts);
        } else {
            res.json({ message: "Seed not required in Mock Mode", products: mockProducts });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Simulate Order
router.post('/orders', async (req, res) => {
    try {
        const { items, address, payment } = req.body;
        console.log('Order received:', { items, address, payment });
        res.status(201).json({ 
            message: 'Order placed successfully!', 
            orderId: 'BUL-' + Math.floor(Math.random()*10000),
            mode: req.isUsingMongoDB ? "database" : "mock"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
