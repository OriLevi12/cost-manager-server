/**
 * @fileoverview Cost addition API routes
 * @requires express
 * @requires ../models/costs
 */

// Import required dependencies
const express = require('express');
const router = express.Router();
const Cost = require('../models/costs');

/**
 * Add a new cost item
 * @route POST /api/add
 * @param {Object} request.body.required - Cost item details
 * @param {string} request.body.description.required - Description of the cost
 * @param {('food'|'health'|'housing'|'sport'|'education')} request.body.category.required - Category of the cost
 * @param {number} request.body.userid.required - ID of the user who made the cost
 * @param {number} request.body.sum.required - Amount of the cost
 * @param {string} [request.body.date] - Date of the cost (ISO format)
 * @returns {Object} 201 - Created cost item
 * @returns {Object} 400 - Invalid input
 * @returns {Object} 500 - Server error
 */
router.post('/', async (req, res) => {
    try {
        // Extract and validate required fields from request body
        const { description, category, userid, sum, date } = req.body;

        // Check if all required fields are present
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new cost document with the provided data
        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date || Date.now()  // Use provided date or default to current time
        });

        // Save the new cost to the database
        await newCost.save();

        // Return the created cost item with 201 status
        res.status(201).json(newCost);
    } catch (err) {
        // Handle any unexpected errors
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
