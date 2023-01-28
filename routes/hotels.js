const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController.js');
//get


//create
router.post('/add',hotelController.createHotel);

//update

//delete




module.exports = router;