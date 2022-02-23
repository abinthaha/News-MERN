const express = require('express');
const router = express.Router();

// Load Book model
const Paper = require('../model/paperModel');

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
    Paper.find()
        .then(paper => res.json(paper))
        .catch(err => res.status(404).json({
            error: 'No data found'
        }));
});

module.exports = router;