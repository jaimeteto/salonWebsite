const mongoose = require('mongoose');

const timeIntervalSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['free', 'taken'],
        default: 'free',
        required: true,
    },
    description: {
        type: String,
        default: '',
    }
});

const TimeInterval = mongoose.model('TimeInterval', timeIntervalSchema);

module.exports = TimeInterval;
