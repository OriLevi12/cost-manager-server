const express = require('express');
const router = express.Router();
const Cost = require('../models/costs');

/**
 * @route GET /api/report
 * @desc Get all cost items of a user in a specific month & year, grouped by category
 */
router.get('/', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { id, year, month } = req.query;

        // Validate the required parameters
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing required query parameters: id, year, month' });
        }

        // Build date range: from the start of the given month to the start of the next month
        const startDate = new Date(year, month - 1, 1); // JavaScript months are 0-indexed
        const endDate = new Date(year, month, 1);       // Start of next month

        // Query the database for cost documents matching the user and date range
        const costs = await Cost.find({
            userid: parseInt(id),
            date: { $gte: startDate, $lt: endDate }
        });

        // Define supported categories
        const categories = ['food', 'health', 'housing', 'sport', 'education'];

        // Group costs by category
        const grouped = categories.map(cat => {
            return {
                [cat]: costs
                    .filter(c => c.category === cat)
                    .map(c => ({
                        sum: c.sum,
                        description: c.description,
                        day: new Date(c.date).getDate()
                    }))
            };
        });

        // Build and return the final response object
        res.json({
            userid: parseInt(id),
            year: parseInt(year),
            month: parseInt(month),
            costs: grouped
        });

    } catch (err) {
        // Return internal server error if something goes wrong
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
