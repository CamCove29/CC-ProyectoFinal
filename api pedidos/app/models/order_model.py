import boto3
from uuid import uuid4
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Pedidos')

def get_all_orders(tenant_id):
    params = {
        "TableName": table.name,
        "KeyConditionExpression": "tenant_id = :tenant_id",
        "ExpressionAttributeValues": {":tenant_id": tenant_id},
    }
    return table.query(**params).get("Items", [])

def get_order_by_id(tenant_id, order_id):
    params = {
        "TableName": table.name,
        "Key": {"tenant_id": tenant_id, "order_id": order_id},
    }
    return table.get_item(**params).get("Item")

def create_order(tenant_id, data):
    order_id = str(uuid4())
    data.update({
        "tenant_id": tenant_id,
        "order_id": order_id,
        "created_at": datetime.utcnow().isoformat(),
    })
    table.put_item(Item=data)
    return data

def update_order(tenant_id, order_id, data):
    params = {
        "TableName": table.name,
        "Key": {"tenant_id": tenant_id, "order_id": order_id},
        "UpdateExpression": "SET #status = :status, #items = :items",
        "ExpressionAttributeNames": {"#status": "status", "#items": "items"},
        "ExpressionAttributeValues": {":status": data["status"], ":items": data["items"]},
        "ReturnValues": "ALL_NEW",
    }
    return table.update_item(**params).get("Attributes")

def delete_order(tenant_id, order_id):
    table.delete_item(Key={"tenant_id": tenant_id, "order_id": order_id})
