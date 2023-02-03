const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController.js');

router.get('/', roomController.getAllRooms);
router.get('/getroom/:roomId', roomController.getRoomById);
router.get('/search-room', roomController.getSearchRooms);
// router.post('/add', roomController.getAllRooms);

//CREATE
router.post("/add/:hotelid", roomController.createRoom);


module.exports = router;