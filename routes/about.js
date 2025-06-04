const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/about
 * @desc    Return team members (hardcoded)
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json([
        { first_name: "Ori", last_name: "Levi" },
        { first_name: "Noam", last_name: "Levi" }
    ]);
});

module.exports = router;
