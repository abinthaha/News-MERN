const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        name: String,
        required: false
    },
    mobile: {
        name: String,
        required: false
    },
    balance: {
        name: String,
        required: false
    }
});

module.exports = User = mongoose.model('user', userSchema);