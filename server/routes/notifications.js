const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// @route   POST /api/notifications/email
// @desc    Send email notification (placeholder)
// @access  Private/Admin/Lecturer
router.post('/email', authenticate, authorize(['admin', 'lecturer']), async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
      return res.status(400).json({ message: 'Please provide to, subject and message' });
    }

    // TODO: integrate with actual email provider (nodemailer / SendGrid / SES)
    console.log(`Email notification placeholder -> to: ${to}, subject: ${subject}, message: ${message}`);

    res.status(200).json({ message: 'Email notification queued (placeholder)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/notifications/sms
// @desc    Send SMS notification (placeholder)
// @access  Private/Admin/Lecturer
router.post('/sms', authenticate, authorize(['admin', 'lecturer']), async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ message: 'Please provide to and message' });
    }

    // TODO: integrate with actual SMS provider (Twilio / Nexmo)
    console.log(`SMS notification placeholder -> to: ${to}, message: ${message}`);

    res.status(200).json({ message: 'SMS notification queued (placeholder)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
