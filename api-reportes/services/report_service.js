const { getReportById, createReport, queryReportsByType } = require('../models/report_model');

const generateSalesReport = async (tenantId) => {
  const report = {
    tenant_id: tenantId,
    report_id: `report_${Date.now()}`,
    report_type: 'ventas',
    created_at: new Date().toISOString(),
    data: {
      total_sales: 50000,
      total_orders: 250,
      average_order_value: 200,
    },
  };
  await createReport(report);
  return report;
};

const getSalesReport = async (tenantId, reportId) => {
  return await getReportById(tenantId, reportId);
};

const listSalesReports = async (tenantId, reportType) => {
  return await queryReportsByType(tenantId, reportType);
};

module.exports = { generateSalesReport, getSalesReport, listSalesReports };
