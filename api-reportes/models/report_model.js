const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Reportes';

const getReportById = async (tenant_id, report_id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            tenant_id,
            report_id
        }
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

const createReport = async (report) => {
    const params = {
        TableName: TABLE_NAME,
        Item: report
    };
    await dynamoDB.put(params).promise();
    return report.report_id;
};

const queryReportsByType = async (tenant_id, report_type) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'ReportTypeIndex',
        KeyConditionExpression: 'tenant_id = :tenant_id AND report_type = :report_type',
        ExpressionAttributeValues: {
            ':tenant_id': tenant_id,
            ':report_type': report_type
        }
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items;
};

const queryReportsByDate = async (tenant_id, date) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'ReportDateIndex',
        KeyConditionExpression: 'tenant_id = :tenant_id AND begins_with(created_at, :date)',
        ExpressionAttributeValues: {
            ':tenant_id': tenant_id,
            ':date': date
        }
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items;
};

module.exports = {
    getReportById,
    createReport,
    queryReportsByType,
    queryReportsByDate
};
