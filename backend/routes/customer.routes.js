const express = require("express");

const {
    registerCustomer,
    loginCustomer,
    getMyProfile,
    logoutCustomer
} = require("../controllers/customer.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


// Register
router.post("/register", registerCustomer);


// Login
router.post("/login", loginCustomer);


// My Profile - Protected
router.get("/me", authMiddleware, getMyProfile);


// Logout
router.post("/logout", authMiddleware, logoutCustomer);


module.exports = router;