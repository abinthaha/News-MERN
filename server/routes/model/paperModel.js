const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    name: {
        name: String,
        required: false
    },
    monthly: {
        name: String,
        required: false
    },
    paperKey: {
        name: String,
        required: false
    }
});

module.exports = Paper = mongoose.model('paper', paperSchema);