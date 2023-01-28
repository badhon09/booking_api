const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (req,res)=> {

	const {name,email,password,type} = req.body;
	bcrypt.hash(password,10,(err,hashedPassword)=>{
		if(err){
			return res.status(500).json({
				error:err
			})
		}
		const saveUser = new User({
			name:name,
			email:email,
			password:hashedPassword,
			type:type
		})
		saveUser.save()
		res.status(200).json(saveUser);
	})

}

exports.login = (req,res) => {
	 const { email, password } = req.body;

	  User.findOne({ email: email }).then(user => {
	    if (!user) {
	      return res.status(401).json({
	        message: "Auth failed"
	      });
	    }

	    bcrypt.compare(password, user.password, (err, result) => {
	      if (err || !result) {
	        return res.status(401).json({
	          message: "Auth failed"
	        });
	      }

	      const token = jwt.sign(
	        {
	          email: user.email,
	          userId: user._id
	        },
	        process.env.JWT_KEY,
	        {
	          expiresIn: "1h"
	        }
	      );

	      res.status(200).json({
	        message: "Auth successful",
	        token: token
	      });
	    });
	  });
}