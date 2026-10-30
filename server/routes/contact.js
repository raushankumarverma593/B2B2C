const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all contact messages (admin)
router.get('/', (req, res) => {
  try {
    const { status } = req.query;
    let submissions = db.getContactSubmissions();
    if (status) {
      submissions = submissions.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact submissions' });
  }
});

// POST new contact submission (public)
router.post('/', (req, res) => {
  try {
    const { name, mobile, email, city, message } = req.body;
    if (!name || !mobile || !message) {
      return res.status(400).json({ success: false, message: 'Name, mobile and message are required' });
    }
    const submission = db.addContactSubmission({ name, mobile, email, city, message });
    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully.',
      data: submission
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit contact message' });
  }
});

// PATCH update status (new, contacted, resolved)
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status is required' });
    }
    const updated = db.updateContactStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message status' });
  }
});

// DELETE contact message
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteContactSubmission(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

module.exports = router;
