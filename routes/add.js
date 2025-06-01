const express = require('express');
const router = express.Router();
const Cost = require('../models/costs');


/**
 * @route POST /api/add
 * @description Add a new cost item to the database
 * @access Public
 */


router.post('/', async (req, res) => {
    try {
        // Destructure the required fields from request body
        const { description, category, userid, sum, date } = req.body;

        // Validate required fields
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new Cost document
        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date || Date.now()  // Use provided date or default to current time
        });

        // Save to database
        await newCost.save();

        // Respond with the saved cost item
        res.status(201).json(newCost);
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
