const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        name: String,
        required: true,
    },
    email: {
        name: String,
        required: true,
        unique:true,
    },
    password: {
        name: String,
        required: true,
    },

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;