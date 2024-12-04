const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const swaggerDocument = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');



module.exports = (app) => {
    app.use('billing/swagger', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));
};
