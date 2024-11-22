import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('Usuarios')

def get_all_users():
    return user_table.scan()['Items']

def get_user_by_id(user_id):
    return user_table.get_item(Key={'user_id': user_id}).get('Item')

def create_user(data):
    user_id = str(uuid.uuid4())
    data['user_id'] = user_id
    user_table.put_item(Item=data)
    return user_id

def update_user(user_id, data):
    user_table.update_item(
        Key={'user_id': user_id},
        UpdateExpression="SET #name = :name, #email = :email, #role = :role",
        ExpressionAttributeNames={
            "#name": "name",
            "#email": "email",
            "#role": "role"
        },
        ExpressionAttributeValues={
            ':name': data['name'],
            ':email': data['email'],
            ':role': data['role']
        }
    )

def delete_user(user_id):
    user_table.delete_item(Key={'user_id': user_id})
