const mongoose = require('mongoose');

const user_schema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        required: true
    }
},
{
    timestamps: true
});

const users = mongoose.model('users', user_schema);

module.exports = users;