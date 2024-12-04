const express = require('express');
const serverless = require('serverless-http');
const billingRoutes = require('./routes/billing_routes');
const swaggerSetup = require('./swagger')

const app = express();
app.use(express.json());
swaggerSetup(app);

app.use('/billing', billingRoutes);

module.exports.handler = serverless(app);
