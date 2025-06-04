const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Cost = require('../models/costs');

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve user details by ID, including total costs
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Find user document by ID
    const user = await User.findOne({ id: userId });

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all cost items for the given user ID
    const userCosts = await Cost.find({ userid: userId });

    // Calculate the total sum of costs for the user
    const total = userCosts.reduce((acc, item) => acc + item.sum, 0);

    // Return the required fields in the JSON response
    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total
    });

  } catch (err) {
    // Handle unexpected errors with a 500 status
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
