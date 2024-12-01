import boto3
import uuid
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')
auth_table = dynamodb.Table('AuthTokens')

def generate_token(user_id):
    """Genera un token con UUID y guarda en DynamoDB."""
    token = str(uuid.uuid4())
    expiration = (datetime.utcnow() + timedelta(hours=1)).isoformat()
    auth_table.put_item(Item={
        'user_id': user_id,
        'token': token,
        'expires_at': expiration
    })
    return token

def validate_token(token):
    """Valida el token verificando su existencia y expiración."""
    response = auth_table.get_item(Key={'token': token})
    item = response.get('Item')
    if not item:
        return None
    if datetime.utcnow().isoformat() > item['expires_at']:
        return None
    return item['user_id']
