const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

const getReportById = async (tenantId, reportId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      tenant_id: tenantId,
      report_id: reportId,
    },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

const createReport = async (report) => {
  const params = {
    TableName: TABLE_NAME,
    Item: report,
  };
  await dynamoDb.put(params).promise();
};

const queryReportsByType = async (tenantId, reportType) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'ReportTypeIndex',
    KeyConditionExpression: 'tenant_id = :tenantId AND report_type = :reportType',
    ExpressionAttributeValues: {
      ':tenantId': tenantId,
      ':reportType': reportType,
    },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
};

module.exports = { getReportById, createReport, queryReportsByType };
