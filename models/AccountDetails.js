const mongoose = require('mongoose');

const AccountSchema= mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true 
        }, // Reference to the user
    accHolderName:{
        type:String,
        required: true,
    },
    accNumber:{
        type:Number,
        required: true,
        unique: true,
    },
    IFC:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model('Account', AccountSchema);