const express = require('express');
const app = express();
const reportRoutes = require('./routes/report_routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());

// Rutas de la API de Reportes
app.use('/api', reportRoutes);

// Documentación de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de Reportes escuchando en el puerto ${PORT}`);
});
