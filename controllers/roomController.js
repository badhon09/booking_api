const Room = require('../models/Room.js')
const Hotel = require('../models/Hotel.js')

exports.createRoom = async (req,res) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
     
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    
  }

}
exports.getAllRooms = async (req,res) => {
	const rooms = await Room.find();
	res.status(200).json(rooms);
}

//get one
exports.getRoomById = async (req,res) => {
  let id = req.params.roomId;
	const room = await Room.find({_id:id});
	res.status(200).json(room);
}