const mongoose = require("mongoose");
const Product = require("../models/product.model");

// CREATE PRODUCT - POST /products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body || {};

        // Validation: Check required fields
        if (
            name === undefined ||
            description === undefined ||
            price === undefined ||
            category === undefined ||
            image === undefined ||
            stock === undefined ||
            !String(name).trim() ||
            !String(description).trim() ||
            !String(category).trim() ||
            !String(image).trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required field: name, description, price, category, image, and stock are required"
            });
        }

        // Validation: Price must be a number > 0
        const numericPrice = Number(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid price: Price must be a number greater than 0"
            });
        }

        // Validation: Stock must be a non-negative number (>= 0)
        const numericStock = Number(stock);
        if (isNaN(numericStock) || numericStock < 0 || !Number.isInteger(numericStock)) {
            return res.status(400).json({
                success: false,
                message: "Invalid stock: Stock must be a non-negative integer"
            });
        }

        // Create in MongoDB
        const product = await Product.create({
            name: String(name).trim(),
            description: String(description).trim(),
            price: numericPrice,
            category: String(category).trim(),
            image: String(image).trim(),
            stock: numericStock
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// GET ALL PRODUCTS (with search, category filter, and bonus price sorting) - GET /products
const getAllProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;

        const query = {};

        // Search by product name (case-insensitive)
        if (search && String(search).trim()) {
            query.name = { $regex: String(search).trim(), $options: "i" };
        }

        // Filter by category (case-insensitive)
        if (category && String(category).trim() && String(category).trim().toLowerCase() !== "all") {
            query.category = { $regex: new RegExp(`^${String(category).trim()}$`, "i") };
        }

        // Bonus: Sort by price
        let sortOption = { createdAt: -1 };
        if (sort === "price_asc") {
            sortOption = { price: 1 };
        } else if (sort === "price_desc") {
            sortOption = { price: -1 };
        }

        const products = await Product.find(query).sort(sortOption);

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// GET SINGLE PRODUCT BY ID - GET /products/:id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
};
