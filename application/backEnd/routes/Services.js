const express = require('express');
const Service = require('../db/models/Service');
const router = express.Router();

// Create a new service with time slots
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

// Get available time slots for a service on a specific date
router.get('/:id/availability/:date', async (req, res) => {
  const { id, date } = req.params;
  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).send('Service not found');
  }

  // Filter time slots for the given date
  const availability = service.timeSlots.filter(slot =>
    slot.date.toISOString().split('T')[0] === date && !slot.isBooked
  );

  res.send(availability);
});

// Book a time slot
router.put('/:id/book', async (req, res) => {
  const { date, time } = req.body;
  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).send('Service not found');
  }

  // Find the time slot and mark it as booked
  const timeSlot = service.timeSlots.find(
    slot => slot.date.toISOString().split('T')[0] === date && slot.time === time
  );

  if (!timeSlot || timeSlot.isBooked) {
    return res.status(400).send('Time slot is not available');
  }

  timeSlot.isBooked = true;
  await service.save();

  res.send(timeSlot);
});

module.exports = router;
