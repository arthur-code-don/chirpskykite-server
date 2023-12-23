import express from "express";


// routes/messaging.js
const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messagingController');

// Define routes for messaging actions
router.post('/send', messagingController.sendMessage);
router.get('/history/:userId', messagingController.getMessageHistory);

module.exports = router;
