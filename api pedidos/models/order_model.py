import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
order_table = dynamodb.Table('Pedidos')

def get_all_orders():
    return order_table.scan()['Items']

def get_order_by_id(order_id):
    return order_table.get_item(Key={'order_id': order_id}).get('Item')

def create_order(data):
    order_id = str(uuid.uuid4())
    data['order_id'] = order_id
    order_table.put_item(Item=data)
    return order_id

def update_order(order_id, data):
    order_table.update_item(
        Key={'order_id': order_id},
        UpdateExpression="SET #status = :status, #items = :items",
        ExpressionAttributeNames={
            "#status": "status",
            "#items": "items"
        },
        ExpressionAttributeValues={
            ':status': data['status'],
            ':items': data['items']
        }
    )

def delete_order(order_id):
    order_table.delete_item(Key={'order_id': order_id})
