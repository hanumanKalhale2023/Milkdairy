const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    contact: String,
    email: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
