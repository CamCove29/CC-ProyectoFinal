import boto3

from auth import validar_api_key


def lambda_handler(event, context):
    try:
        headers = event['headers']
        validar_api_key(headers)
        
        tenant_id = event['queryStringParameters']['tenant_id']
        order_id = event['queryStringParameters']['order_id']

        if not (tenant_id and order_id):
            return {
                'statusCode': 400,
                'body': 'Los parámetros tenant_id y order_id son obligatorios.'
            }

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('tabla_pedidos')

        response = table.get_item(
            Key={
                'tenant_id': tenant_id,
                'order_id': order_id
            }
        )

        item = response.get('Item')
        if not item:
            return {
                'statusCode': 404,
                'body': 'Pedido no encontrado.'
            }

        return {
            'statusCode': 200,
            'body': item
        }
        
    except ValueError as e:
        return {
            'statusCode': 403,
            'body': f'{str(e)}'
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error interno: {str(e)}'
        }
