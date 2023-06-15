const { name } = require('ejs');
const User = require('../models/User');


exports.getProfile = async(req,res)=> {

    let id = req.params.userId;

try {
    const user = await User.find({_id:id});
    res.status(200).json(user); 
} catch (error) {
    
}

}

exports.updateProfile = async(req,res)=> {
    let id = req.params.userId;
    const {name,email} = req.body;
    try {
        const user = await User.updateOne( { _id: id }, { $set: { name: name , email:email } } ) 
        res.status(200).json(user); 
    } catch (error) {
        
    }

}