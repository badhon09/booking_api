const Room = require('../models/Room.js')
const Booking = require('../models/Booking.js')

exports.createBooking = async (req,res) => {
  //const roomNumber = req.body.roomNumber;
  const newBooking = new Booking(req.body);
  const {roomNumber,checkInDate,checkOutDate} = req.body;
  console.log(newBooking);

  try {
    const savedBooking = await newBooking.save();
    await updateRoomUnavailableDates(roomNumber,checkInDate,checkOutDate);
    console.log(savedBooking)
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }

}
exports.getBookings = async (req,res) => {
    //res.send(req.params.userId);
    const userId = req.params.userId
	const bookings = await Booking.find({"userId":userId});
	res.status(200).json(bookings);
}

const updateRoomUnavailableDates = async (roomId, checkInDate, checkOutDate) => {
  try {
    // Find the room by its ID
    const room = await Room.findById(roomId);

    // Update the room's unavailable dates
    room.roomNumbers.forEach((roomNumber) => {
      if (roomNumber.unavailableDates) {
        roomNumber.unavailableDates.push(checkInDate, checkOutDate);
      } else {
        roomNumber.unavailableDates = [checkInDate, checkOutDate];
      }
    });

    // Save the updated room
    await room.save();
  } catch (error) {
    console.error('Error updating room unavailable dates:', error);
    throw error;
  }
};