const Room = require('../models/Room.js')
const Booking = require('../models/Booking.js')

exports.createBooking = async (req,res) => {
  //const roomNumber = req.body.roomNumber;
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    
  }

}
exports.getBookings = async (req,res) => {
    //res.send(req.params.userId);
    const userId = req.params.userId
	const bookings = await Booking.find({"userId":userId});
	res.status(200).json(bookings);
}