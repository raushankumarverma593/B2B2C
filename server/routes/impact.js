const express = require('express');
const router = express.Router();
const db = require('../db');

// GET impact metrics
router.get('/', (req, res) => {
  try {
    const impact = db.getImpact();
    res.json({ success: true, data: impact });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch impact metrics' });
  }
});

// PUT update impact metrics (admin only)
router.put('/', (req, res) => {
  try {
    const { bottlesCollected, shopsPartnered, plasticSavedKg, co2SavedKg } = req.body;
    const updated = db.updateImpact({
      bottlesCollected,
      shopsPartnered,
      plasticSavedKg,
      co2SavedKg
    });
    res.json({ success: true, message: 'Impact metrics updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update impact metrics' });
  }
});

module.exports = router;
