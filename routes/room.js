const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController.js');

router.get('/', roomController.getAllRooms);
// router.post('/add', roomController.getAllRooms);

//CREATE
router.post("/add/:hotelid", roomController.createRoom);


module.exports = router;