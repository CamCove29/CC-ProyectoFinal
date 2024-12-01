import boto3
import uuid
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')
auth_table = dynamodb.Table('AuthTokens')

def generate_token(tenant_id, user_id):
    """Genera un token único con expiración y lo almacena en DynamoDB."""
    token = str(uuid.uuid4())
    expiration = (datetime.utcnow() + timedelta(hours=1)).isoformat()

    auth_table.put_item(Item={
        'tenant_id': tenant_id,
        'user_id': user_id,
        'token': token,
        'expires_at': expiration
    })

    return token

def validate_token(token):
    """Valida un token verificando su existencia y expiración."""
    response = auth_table.get_item(Key={'token': token})
    item = response.get('Item')

    if not item:
        return None  # Token no encontrado

    if datetime.utcnow().isoformat() > item['expires_at']:
        return None  # Token expirado

    return item  # Retorna datos del token
