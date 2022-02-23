const express = require('express');
const router = express.Router();

// Load Book model
const User = require('../model/userModel');

// @route GET api/books
// @description Get all books
// @access Public
router.get('/:key', (req, res) => {
    User.findOne({
            mobile: req.params.key
        })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({
            error: 'No data found'
        }));
});

router.post('/update', (req, res) => {
    const {
        mobile,
        newBalance
    } = req.body;
    User.findOneAndUpdate({
            mobile: mobile
        }, {
            balance: newBalance
        })
        .then(() => {
            User.findOne({
                    mobile: mobile
                })
                .then(users => res.json(users))
                .catch(err => res.status(404).json({
                    error: 'No data found'
                }));
        })
        .catch(err => res.status(404).json({
            error: 'No data found'
        }));
});

module.exports = router;