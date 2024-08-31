// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const client = require('../client');

// const client = new Client({
//     authStrategy: new LocalAuth()
// });

const scheduledMessages = [];

// // Initialize the WhatsApp client
// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//     console.log('Client is ready');
// });

// client.initialize();

// Schedule a message
const scheduleMessage = async (req, res) => {
    const { number, message, scheduleTime } = req.body;

    if (!number || !message || !scheduleTime) {
        return res.status(400).json({ error: 'Number, message, and scheduleTime are required' });
    }

    // Add the scheduled message to the array
    scheduledMessages.push({ number, message, scheduleTime });

    // Schedule the message
    cron.schedule(scheduleTime, async () => {
        try {
            await client.sendMessage(number, message);
            console.log(`Message sent to ${number}: ${message}-3`);
        } catch (error) {
            console.error(`Failed to send message to ${number}: ${error}`);
        }
    });

    res.status(200).json({ success: true, message: 'Message scheduled successfully' });
};


const sendMessage = async (req, res) => {
    const { number, message } = req.body;
    
    if (!number || !message) {
        return res.status(400).json({ error: 'Number and message are required' });
    }

    client.sendMessage(number, message)
        .then(response => {
            res.status(200).json({ success: true, response });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to send message', details: error });
        });
};


module.exports = { scheduleMessage, sendMessage };
