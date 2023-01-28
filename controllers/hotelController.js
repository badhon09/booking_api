const Hotel = require('../models/Hotel.js')

exports.createHotel = (req,res) => {
	const newHotel = new Hotel(req.body)
	try{
		const saveHotel = newHotel.save();
		res.status(200).json(saveHotel);
	}catch(err){
		res.status(500).json(err);
	}

}