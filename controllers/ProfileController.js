const Profile= require('../models/Profile')

exports.addProfile = async (req, res)=>{
    try{
        const userId = req.user.id; // Get the userId from the token (middleware)
        const profile = new Profile({...req.body, userId }); // Add userId to the profile record
        await profile.save();
        res.status(201).json({ message: 'Profile added successfully' });
    } catch(error){
        res.status(500).json({ message: 'Error adding profile', error });
    }
  
}

exports.getProfile = async (req, res)=>{
    try{
        //const userId = req.params.id; // Get the userId from the request parameters
        const userId = req.user.id;
        //find the profile by user id
        const profile = await Profile.findOne({ userId }); // Find the profile by userId
        if(!profile){
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch(error){
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
 
}

//update profile 
exports.updateProfile = async (req,res)=>{
    try{
        //const userId = req.params.id; // Get the userId from the request parameters
        const userId = req.user.id;
        const profile = await Profile.findOneAndUpdate({ userId }, {...req.body }, { new: true }); // Update the profile by userId
        if(!profile){
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch(error){
        res.status(500).json({ message: 'Error updating profile', error });
    }
}
