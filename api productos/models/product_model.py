import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
product_table = dynamodb.Table('Productos')

def get_all_products():
    return product_table.scan()['Items']

def get_product_by_id(product_id):
    return product_table.get_item(Key={'product_id': product_id}).get('Item')

def create_product(data):
    product_id = str(uuid.uuid4())
    data['product_id'] = product_id
    product_table.put_item(Item=data)
    return product_id

def update_product(product_id, data):
    product_table.update_item(
        Key={'product_id': product_id},
        UpdateExpression="SET #name = :name, #price = :price, #desc = :desc",
        ExpressionAttributeNames={
            "#name": "name",
            "#price": "price",
            "#desc": "description"
        },
        ExpressionAttributeValues={
            ':name': data['name'],
            ':price': data['price'],
            ':desc': data['description']
        }
    )

def delete_product(product_id):
    product_table.delete_item(Key={'product_id': product_id})
