const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // ✅ Reference User model
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    milkType: {
        type: String,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    presentDaysCount: {
        type: Number,
        default: 0
    },
    absentDaysCount: {
        type: Number,
        default: 0
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
