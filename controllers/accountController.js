const Account = require('../models/AccountDetails');

exports.addAccountDetails =  async (req, res)=>{
    try{
        const userId = req.user.id; // Get the userId from the token (middleware)
        const account = new Account({...req.body, userId }); // Add userId to the account record
        await account.save();
        res.status(201).json({ message: 'Account details added successfully' });
    }catch(error){
        res.status(500).json({ message: 'Error adding account details', error });
    }
}


//get account details
exports.getAccountDetails = async (req, res) => {
    try {
        const userId = req.user.id; // Extract the userId from the token (middleware)
        const accountDetails = await Account.find({ userId }); // Fetch only accounts belonging to the logged-in user
        
        if (!accountDetails || accountDetails.length === 0) {
            return res.status(404).json({ message: 'No account details found for this user' });
        }
        
        res.status(200).json(accountDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error getting account details', error });
    }
};


//update account details
exports.updateAccountDetails = async (req, res)=>{
    //get account details by id
    try{
        const userId = req.user.id;
        const account = await Account.findOneAndUpdate({ userId}, {...req.body }, { new: true });
        if(!account){
            return res.status(404).json({ message: 'Account details not found' });
        }
        res.status(200).json({ message: 'Account details updated successfully', account });
    }catch(error){
        res.status(500).json({ message: 'Error updating account details', error });
    }
}
