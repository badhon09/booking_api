const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');


router.get('/all/:userId',bookingController.getBookings);
router.post('/add',bookingController.createBooking);




module.exports = router;