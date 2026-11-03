
const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const connection = require('./config/db');
const limiter = require('./middleware/ratelimit');

const productroutes = require('./routes/productroutes');
const authroutes = require('./routes/authroutes');

const port = process.env.PORT || 3000;


// MIDDLEWARE

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(limiter);


// ROUTES

app.use('/products', productroutes);
app.use('/auth', authroutes);


// START SERVER

app.listen(port, async () => {
    console.log(`The server is running on ${port}`);

    try {
        await connection();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Database connection failed:", error.message);
    }
});
