const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ORDERS_TABLE = 'orderService-dev';

const queryOrders = async (tenantId) => {
  const params = {
    TableName: ORDERS_TABLE,
    KeyConditionExpression: 'tenant_id = :tenantId',
    ExpressionAttributeValues: {
      ':tenantId': tenantId,
    },
  };

  const result = await dynamoDb.query(params).promise();
  return result.Items || [];
};

module.exports = { queryOrders };
