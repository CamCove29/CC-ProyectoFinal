const { getReportById, createReport, queryReportsByType, queryReportsByDate } = require('../models/report_model');

const generateSalesReport = async (tenant_id) => {
    const report = {
        tenant_id,
        report_id: `report_${Date.now()}`,
        report_type: 'ventas',
        created_at: new Date().toISOString(),
        data: {
            total_sales: 50000,
            total_orders: 250,
            average_order_value: 200
        }
    };
    const report_id = await createReport(report);
    return report;
};

const getSalesReport = async (tenant_id, report_id) => {
    return await getReportById(tenant_id, report_id);
};

const listSalesReports = async (tenant_id, report_type) => {
    return await queryReportsByType(tenant_id, report_type);
};

module.exports = {
    generateSalesReport,
    getSalesReport,
    listSalesReports
};
