const express = require('express');
const cors = require('cors');
require('dotenv').config();

emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/email', emailRoutes);

module.exports = app;
