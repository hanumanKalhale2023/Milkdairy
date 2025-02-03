const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
},{timestamps: true});

module.exports = mongoose.model('Address', addressSchema);