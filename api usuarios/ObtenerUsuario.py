import boto3
import json
from auth import validate_token


dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        token = event['headers'].get('Authorization')
        if not validate_token(token):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Token inválido o expirado'})
            }

        response = user_table.scan()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'users': response['Items']})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': f'Error interno: {str(e)}'})
        }
