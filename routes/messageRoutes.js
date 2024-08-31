const express = require('express');
const { scheduleMessage } = require('../controllers/messageControllers');
const { sendMessage } = require('../controllers/messageControllers')

const router = express.Router();

// Route to schedule a message
router.post('/schedule-message', scheduleMessage);
router.post('/send-Message', sendMessage)

module.exports = router;
