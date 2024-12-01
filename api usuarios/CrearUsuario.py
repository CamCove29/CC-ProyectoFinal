import boto3
import json
import uuid
from auth import generate_token


dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = str(uuid.uuid4())
        body['user_id'] = user_id
        user_table.put_item(Item=body)

        token = generate_token(user_id)

        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Usuario creado', 'user_id': user_id, 'token': token})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': f'Error interno: {str(e)}'})
        }
