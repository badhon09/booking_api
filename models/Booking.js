const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
          },
          roomNumber: {
            type: String,
            required: true,
          },
          checkIn: {
            type: String,
            required: true,
          },
          checkOut: {
            type: String,
            required: true,
          },
          totalPrice: {
            type: Number,
            required: true,
          },

          isPaid: {
            type: Boolean,
            default:false
          },
          
          desc: {
            type: String,
           
          },
         
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking",BookingSchema);