const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const customerRoutes = require("./routes/customer.routes");

dotenv.config();

const app = express();


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