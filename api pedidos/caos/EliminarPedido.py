import boto3

from auth import validar_token


def lambda_handler(event, context):
    try:
        headers = event['headers']
        user_payload = validar_token(headers)
        user_id = user_payload['user_id']
        
        tenant_id = event['queryStringParameters']['tenant_id']
        order_id = event['queryStringParameters']['order_id']

        if not (tenant_id and order_id):
            return {
                'statusCode': 400,
                'body': 'Los parámetros tenant_id y order_id son obligatorios.'
            }

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('tabla_pedidos')

        table.delete_item(
            Key={
                'tenant_id': tenant_id,
                'order_id': order_id
            }
        )

        return {
            'statusCode': 200,
            'body': 'Pedido eliminado exitosamente.'
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
