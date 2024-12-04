const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Carga el JSON directamente

module.exports = (app) => {
    app.use('/inventory/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
