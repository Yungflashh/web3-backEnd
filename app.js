const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/walletRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/wallet', walletRoutes);

module.exports = app;
