const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
     },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    milkType: {
        type: String,
        required: true,
        enum: ['cow', 'buffalo']
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);