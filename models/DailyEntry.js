const mongoose = require('mongoose');


const dailyEntrySchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    attendance:{
        type:String,
        enum: ['present', 'absent'],
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    updatedDate:{
        type:Date,
    }
}, {timestamps:true});

module.exports = mongoose.model('DailyEntry', dailyEntrySchema);