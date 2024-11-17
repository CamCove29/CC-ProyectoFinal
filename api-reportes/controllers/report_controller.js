const express = require('express');
const router = express.Router();
const { generateSalesReport, getSalesReport, listSalesReports } = require('../services/report_service');
const { validateToken } = require('../utils/auth');


router.use(validateToken);

router.post('/sales', async (req, res) => {
    const tenant_id = req.user.tenant_id; 
    try {
        const report = await generateSalesReport(tenant_id);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Error generando el reporte de ventas' });
    }
});

router.get('/sales/:report_id', async (req, res) => {
    const tenant_id = req.user.tenant_id;
    const report_id = req.params.report_id;
    try {
        const report = await getSalesReport(tenant_id, report_id);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ message: 'Reporte no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el reporte' });
    }
});

router.get('/sales', async (req, res) => {
    const tenant_id = req.user.tenant_id;
    const report_type = 'ventas';
    try {
        const reports = await listSalesReports(tenant_id, report_type);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Error listando los reportes de ventas' });
    }
});

module.exports = router;
