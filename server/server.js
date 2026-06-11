const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with Fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bularia';
let isUsingMongoDB = false;

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully!');
        isUsingMongoDB = true;
    })
    .catch(err => {
        console.warn('MongoDB connection failed:', err.message);
        console.warn('Falling back to local data mode for demo.');
        console.warn('To use MongoDB, ensure the URI is correct:', MONGODB_URI);
    });

// Make fallback status available to routes
app.use((req, res, next) => {
    req.isUsingMongoDB = isUsingMongoDB;
    next();
});

// Routes
const productRoutes = require('./routes/api');
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
