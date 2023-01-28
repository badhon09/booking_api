const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel.js')

//get


//create
router.post('/add', (req,res) => {
	res.send('aaaaa'+req.body.name);
	const newHotel = new Hotel(req.body)
	try{
		const saveHotel = newHotel.save();
		res.status(200).json(saveHotel);
	}catch(err){
		res.status(500).json(err);
	}

});

//update

//delete




module.exports = router;