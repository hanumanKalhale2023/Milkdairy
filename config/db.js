const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;//geting mongo uri from env

//connect to Mongo
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
