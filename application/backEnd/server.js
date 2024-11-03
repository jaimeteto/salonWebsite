const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const serviceRoutes = require('./routes/Services');



const app = express();
const port = process.env.PORT || 3000;


const cors = require('cors');
app.use(cors()); // Allow all origins


// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Connection
const url = process.env.MONGO_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/services', serviceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
