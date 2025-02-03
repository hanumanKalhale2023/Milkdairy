const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: {
        type: Date,
        required: true
    },
    attendance: {
        type: String,
        required: true,
        enum: ['present', 'absent']
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);