const mongoose = require('mongoose')

const priceSchema = mongoose.Schema({
    milkType:{
        type: String,
        required: true
    },
    milkPrice: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Price', priceSchema);