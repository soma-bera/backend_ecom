
// Database connection

const mongoose = require('mongoose');
require('dotenv').config();

async function connection() {
    try {
        await mongoose.connect(process.env.MONGODBURL);

        console.log("Database is connected successfully");
    }
    catch (error) {
        console.log("Database connection error:", error.message);
        throw error;
    }
}

module.exports = connection;
