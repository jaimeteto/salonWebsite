const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TimeInterval = require('./timeInterval');

require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection URL
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));

// GET: Retrieve all time intervals
app.get('/api/intervals', async (req, res) => {
    try {
        const intervals = await TimeInterval.find();
        res.json(intervals);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch time intervals' });
    }
});

// POST: Create a new time interval
app.post('/api/intervals', async (req, res) => {
    const { startTime, endTime, status, description } = req.body;

    // Validation example: Ensure endTime is after startTime
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).send({ error: 'End time must be after start time' });
    }

    try {
        const newInterval = new TimeInterval({
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status: status || 'free',
            description: description || ''
        });

        const savedInterval = await newInterval.save();
        res.status(201).json(savedInterval);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create time interval' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
