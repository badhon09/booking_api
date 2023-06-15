const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');

router.post('/register', authController.register);

router.get('/profile/:userId', userController.getProfile);
router.post('/update-profile/:userId', userController.updateProfile);


module.exports = router;