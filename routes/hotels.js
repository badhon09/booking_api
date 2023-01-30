const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController.js');


router.get('/all',hotelController.getHotels);
router.post('/add',hotelController.createHotel);




module.exports = router;