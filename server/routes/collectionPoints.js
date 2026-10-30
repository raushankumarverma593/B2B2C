const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all collection points with optional search/filter
router.get('/', (req, res) => {
  try {
    const { city, area, search } = req.query;
    let points = db.getCollectionPoints();

    if (city && city.toLowerCase() !== 'all') {
      points = points.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }
    if (area && area.toLowerCase() !== 'all') {
      points = points.filter(p => p.area.toLowerCase().includes(area.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      points = points.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: points.length, data: points });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch collection points' });
  }
});

// POST add collection point (admin)
router.post('/', (req, res) => {
  try {
    const { name, city, area, address, lat, lng, operatingHours, binType, status } = req.body;
    if (!name || !city || !address) {
      return res.status(400).json({ success: false, message: 'Point name, city and address are required' });
    }
    const newPoint = db.addCollectionPoint({
      name,
      city,
      area: area || city,
      address,
      lat: lat ? parseFloat(lat) : 28.6139,
      lng: lng ? parseFloat(lng) : 77.2090,
      operatingHours: operatingHours || '08:00 AM - 10:00 PM',
      binType: binType || 'Standard 200-PET Bin',
      status: status || 'active'
    });
    res.status(201).json({ success: true, message: 'Collection point added successfully', data: newPoint });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add collection point' });
  }
});

// PUT update collection point
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateCollectionPoint(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Collection point not found' });
    }
    res.json({ success: true, message: 'Collection point updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update collection point' });
  }
});

// DELETE collection point
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteCollectionPoint(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Collection point not found' });
    }
    res.json({ success: true, message: 'Collection point deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete collection point' });
  }
});

module.exports = router;
