const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    about: String,
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
