const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const logger = require('./middleware/logger');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());


connectDB();

app.use(express.json({ extended: false }));
app.use(logger);
console.log('logger defined');



app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));