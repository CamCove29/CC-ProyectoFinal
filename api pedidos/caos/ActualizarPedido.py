import boto3
from auth import validar_token

def lambda_handler(event, context):
    try:
        
        headers = event['headers']
        user_payload = validar_token(headers)
        user_id = user_payload['user_id']
        
        body = event['body']
        tenant_id = body['tenant_id']
        order_id = body['order_id']
        status = body['status']
        items = body['items']

        if not (tenant_id and order_id and status):
            return {
                'statusCode': 400,
                'body': 'Los campos tenant_id, order_id y status son obligatorios.'
            }

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('tabla_pedidos')

        table.update_item(
            Key={
                'tenant_id': tenant_id,
                'order_id': order_id
            },
            UpdateExpression="SET #status = :status, #items = :items",
            ExpressionAttributeNames={
                '#status': 'status',
                '#items': 'items'
            },
            ExpressionAttributeValues={
                ':status': status,
                ':items': items
            }
        )

        return {
            'statusCode': 200,
            'body': 'Pedido actualizado exitosamente.'
        }
        
    except jwt.ExpiredSignatureError:
        return {
            'statusCode': 401,
            'body': 'El token ha expirado.'
        }
    except jwt.InvalidTokenError as e:
        return {
            'statusCode': 403,
            'body': f'Token inválido: {str(e)}'
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error interno: {str(e)}'
        }
