const { queryOrders } = require('../models/orders_model'); // Nuevo modelo para consultar pedidos
const { createReport } = require('../models/report_model');

const generateSalesReport = async (tenantId) => {
  const orders = await queryOrders(tenantId);

  const totalSales = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  const report = {
    tenant_id: tenantId,
    report_id: `report_${Date.now()}`,
    report_type: 'ventas',
    created_at: new Date().toISOString(),
    data: {
      total_sales: totalSales,
      total_orders: totalOrders,
      average_order_value: averageOrderValue,
    },
  };

  // Guardar el reporte en DynamoDB
  await createReport(report);

  return report;
};

module.exports = { generateSalesReport };
