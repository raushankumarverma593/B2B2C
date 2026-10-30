const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all shop partners
router.get('/', (req, res) => {
  try {
    const { city, status } = req.query;
    let partners = db.getPartners();
    if (city) {
      partners = partners.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }
    if (status) {
      partners = partners.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    res.json({ success: true, count: partners.length, data: partners });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch partners' });
  }
});

// POST add new shop partner (admin)
router.post('/', (req, res) => {
  try {
    const { shopName, ownerName, mobile, city, area, shopType, bottlesPerDay, address, status } = req.body;
    if (!shopName || !ownerName || !mobile) {
      return res.status(400).json({ success: false, message: 'Shop name, owner name and mobile number are required' });
    }
    const partner = db.addPartner({ shopName, ownerName, mobile, city, area, shopType, bottlesPerDay, address, status });
    res.status(201).json({ success: true, message: 'Shop partner added successfully', data: partner });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add partner' });
  }
});

// PUT update partner
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updatePartner(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.json({ success: true, message: 'Partner updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update partner' });
  }
});

// DELETE partner
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deletePartner(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.json({ success: true, message: 'Partner deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete partner' });
  }
});

module.exports = router;
