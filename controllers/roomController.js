const Room = require('../models/Room.js')
const Hotel = require('../models/Hotel.js')
const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking.js');



exports.createRoom =  async (req,res) => {
  const hotelId = req.params.hotelid;
  console.log(req.body.file.filename);
  let {title,price,maxPeople,desc} = req.body;
  let photo =  req.body.file.filename;
  //res.send(req.body); 
  //upload.single(req.body.photo)
  const newRoom = new Room({
    title,
    price,
    photo:photo,
    maxPeople,
    desc
  });
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
    res.status(500).json(err);
  }

}
exports.getAllRooms = async (req,res) => {
	const rooms = await Room.find();
	res.status(200).json(rooms);
}

exports.getSearchRooms = async (req,res) => {
  const {persons} = req.query; 

  try{
    const rooms = await Room.find({
      $and : [
        {maxPeople:{$lte:persons}}
      ]
    });

    res.status(200).json(rooms);
  }catch(err){
    res.status(500).json(err);
  }

}

//get one
exports.getRoomById = async (req,res) => {
  let id = req.params.roomId;

  try{
    const room = await Room.find({_id:id});
    res.status(200).json(room);
  }catch(err){

    res.status(500).json(err);
  }

}

exports.getRoomsByFilter = async (req,res) => {
 

  try{
    const { checkIn, checkOut } = req.body;
    
    // Convert the check-in and check-out strings to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    // Query the database to filter the bookings based on the check-in and check-out dates
    const bookings = await Booking.find({
      checkIn: { $lte: checkOutDate },
      checkOut: { $gte: checkInDate }
    },
    { _id: 1 }); // Assuming there's a reference to the room in the Booking schema

    let maxPerson = req.params.maxPerson;

    let rooms = await Room.find({
      maxPeople:{$gte: maxPerson }
  });

    res.json(rooms);
  }catch(err){

    res.status(500).json(err);
  }

}

