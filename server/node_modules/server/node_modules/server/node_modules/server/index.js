const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors'); // Import cors package
app.use(express.json());


const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/Automatic_TimeTable_Generator';
  const mongoURI = process.env.MONGO_URL
app.use(cors());
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const timetableRoutes = require('./routes/timetableRoute')
const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes);
app.use('/api', timetableRoutes);




const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

