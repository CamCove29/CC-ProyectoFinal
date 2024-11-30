import boto3
from auth import validar_api_key

def lambda_handler(event, context):
    try:
        
        headers = event['headers']
        validar_api_key(headers)
        
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
