import boto3
import json
from auth_service import validate_token

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('Usuarios')

def lambda_handler(event, context):
    try:
        # Validar token
        token = event['headers'].get('Authorization')
        token_data = validate_token(token)
        if not token_data:
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Token inválido o expirado.'})
            }

        tenant_id = token_data['tenant_id']
        user_id = event['pathParameters']['user_id']

        # Eliminar usuario
        user_table.delete_item(Key={'tenant_id': tenant_id, 'user_id': user_id})

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Usuario eliminado'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f'Error interno: {str(e)}'})
        }
