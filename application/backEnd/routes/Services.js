const express = require('express');
const Service = require('../db/models/Service');
const router = express.Router();

// Create a new service with time slots
router.post('/', async (req, res) => {
  const { availability } = req.body; // Destructure availability from request body

  // Validate availability
  if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ error: 'Availability is required and must be an array' });
  }

  // Logging the request data
  console.log('Request Body:', req.body);

  // Loop through availability array
  availability.forEach(avail => {
      console.log('Date:', avail.date);
      
      if (avail.timeSlots && Array.isArray(avail.timeSlots)) {
          avail.timeSlots.forEach(slot => {
              console.log('Time Slot:', slot.startTime, 'to', slot.endTime);
          });
      } else {
          console.log('Time slots are missing or not an array');
      }
  });

  try {
      const service = new Service(req.body); // Create a new service instance
      await service.save(); // Save the service to MongoDB
      res.status(201).json(service); // Respond with the created service
  } catch (error) {
      console.error('Error saving service:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  console.log('Request Body:', req.body);
  res.send(services);
});

// Get available time slots for a service on a specific date
router.get('/:stylistName/availability/:date', async (req, res) => {
  const { stylistName, date } = req.params;
  try {

    const service = await Service.findOne({ 'availability.date':date });
    
    

    if (!service) {
      return res.status(404).json({ message: 'Service not found' }); // Handle the case where the service does not exist
    }
   

    // Filter time slots for the given date
    //const Cdate = service.availability.date;
    // Parse the date parameter to a Date object
   

     // Log the available time slots
     const availableTimes = service.availability.find( day => day.date==date)

    res.send(availableTimes.timeSlots);

  }  

  catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
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
