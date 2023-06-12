const express = require('express');
const app = express()
const port = 3001;
const mongoose = require('mongoose');
var cors = require('cors')
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path')

app.set('view engine','ejs');

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({storage:storage})

app.get('/upload',(req,res)=>{
  res.render('upload')
})

app.post('/upload',upload.single('file'),(req,res)=>{
  res.send('upload')
})

const userRoutes = require('./routes/users.js')
const hotelRoutes = require('./routes/hotels.js')
const authRoutes = require('./routes/auth.js')
const roomRoutes = require('./routes/room.js')
const bookingRoutes = require('./routes/booking.js')


mongoose.connect('mongodb+srv://badhon_09:badhon09@cluster0.hyrvm.mongodb.net/bookingApp')
  .then(()=> {
    console.log('Database connected to Booking');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.listen(port, () => {
	console.log("App is Running on" +port)
});

// create a transporter object using Gmail as the email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrdoncc9@gmail.com',
    pass: '###'
  }
});

// endpoint to send an email
app.post('/send-email', (req, res) => {
  //res.send(req.body.message)
  const mailOptions = {
    from: 'badhonghosh62@gmail.com',
    to: 'badhonghosh09@gmail.com',
    subject: req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});


//middleware
// app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/hotels',hotelRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/rooms',roomRoutes);
app.use('/api/bookings',bookingRoutes);
