require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors=require('cors');
// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',  // Allows all origins; you can specify your frontend URL here for more security (e.g., 'http://localhost:3000')
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allows cookies to be sent with requests (if needed)
};

// Enable CORS with the specified options
app.use(cors(corsOptions));


// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/address', require('./routes/addressRoutes'));
app.use('/api/account', require('./routes/accountRoutes'));
app.use('/api/preferences', require('./routes/deliveryPreferenceRoutes'));
app.use('/api', require('./routes/orderRoutes'));
app.use('/api/price', require('./routes/priceRoutes'));
app.use('/api/entries', require('./routes/dailyEntryRoutes'));
app.use('/api', require('./routes/invoiceRoutes'));
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
