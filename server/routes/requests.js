const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all partner registration requests (admin)
router.get('/', (req, res) => {
  try {
    const { status } = req.query;
    let requests = db.getRequests();
    if (status) {
      requests = requests.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    res.json({ success: true, count: requests.length, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch partner requests' });
  }
});

// POST submit partner registration request (public)
router.post('/', (req, res) => {
  try {
    const { shopName, ownerName, mobile, cityArea, shopType, bottlesPerDay, address, message } = req.body;
    if (!shopName || !ownerName || !mobile) {
      return res.status(400).json({ success: false, message: 'Shop name, owner name and mobile number are required' });
    }
    const newRequest = db.addRequest({
      shopName,
      ownerName,
      mobile,
      cityArea,
      shopType,
      bottlesPerDay,
      address,
      message
    });
    res.status(201).json({
      success: true,
      message: 'Registration request submitted successfully.',
      data: newRequest
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit registration request' });
  }
});

// PATCH update status (approved, rejected, pending)
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status (pending, approved, rejected) is required' });
    }
    const updated = db.updateRequestStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.json({ success: true, message: `Request status updated to ${status}`, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update request status' });
  }
});

// DELETE request
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteRequest(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete request' });
  }
});

module.exports = router;
