const express = require('express');
const serverless = require('serverless-http');
const swaggerSetup = require('./swagger');
const inventoryController = require('./inventoryController');

const app = express();
app.use(express.json());

swaggerSetup(app); // Agrega Swagger UI en /api-docs

app.use('/inventory', inventoryController);

module.exports.handler = serverless(app);
