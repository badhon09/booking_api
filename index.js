const express = require('express');
const app = express()
const port = 3000;
const mongoose = require('mongoose');

const userRoutes = require('./routes/users.js')
const hotelRoutes = require('./routes/hotels.js')
const authRoutes = require('./routes/auth.js')


mongoose.connect('mongodb+srv://badhon_09:badhon09@cluster0.hyrvm.mongodb.net/bookingApp')
  .then(()=> {
    console.log('Database connected to Booking');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.listen(port, () => {
	console.log("App is Running on" +port)
});

app.use('/test', (req,res) => {
  res.send('asdf'+req.body.name);
});

//middleware
// app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/hotels',hotelRoutes);
app.use('/api/auth',authRoutes);