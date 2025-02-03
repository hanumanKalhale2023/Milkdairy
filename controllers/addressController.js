const Address = require('../models/Address');

exports.addAddress = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from the token (middleware)
        //if the address is already in the address table so then don't add it
        const existingAddress = await Address.findOne({ userId, address: req.body.address });
        if (existingAddress) {
            return res.status(400).json({ message: 'Address already exists' });
        }

        // Add userId to the address record and save it to the database.
        const address = new Address({...req.body, userId }); // Add userId to the address record
        await address.save();
        res.status(201).json({ message: 'Address added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding address', error });
    }
 };

// get the address
exports.getAddress = async (req, res)=>{
    try {
        const userId = req.user.id; // Get the userId from the token (middleware)
        const address = await Address.findOne({ userId });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error getting address', error });
    }
}

//update the address 
exports.updateAddress= async (req, res)=>{
    try {
        const userId = req.user.id; // Get the userId from the token (middleware)
        const address = await Address.findOneAndUpdate({ userId }, req.body, { new: true });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error });
    }
}

//