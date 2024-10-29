const mongoose = require('mongoose');
const timeSlot = new mongoose.Schema({
    
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
});
const AvailabilitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeSlots: [timeSlot]
});

const ServiceSchema = new mongoose.Schema({
  stylist: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  serviceType: { type: String },
  price: { type: Number, required: true },
  duration: { type: String },
  availability: [AvailabilitySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
