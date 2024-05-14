const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route to handle user registration
router.post('/register', UserController.register);

module.exports = router;
