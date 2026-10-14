const dns = require("dns");
const dotenv = require("dotenv");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const customerRoutes = require("./routes/customer.routes");

const app = express();


// CORS middleware for credentials & frontend origin
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.header("Access-Control-Allow-Origin", origin);
    } else {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/customers", customerRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ShopKart Backend is running"
    });
});


// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });