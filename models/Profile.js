const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    name: String,
    number: String,
    altNumber:String,
},{timestamps:true});

module.exports = mongoose.model('Profile', profileSchema);

