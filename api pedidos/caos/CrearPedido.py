import boto3
import uuid
from datetime import datetime
from auth import validar_api_key
import json

def lambda_handler(event, context):
    try:
        headers = event['headers']
        validar_api_key(headers)
        
        body = json.loads(event['body'])
        tenant_id = body['tenant_id']
        customer_name = body['customer_name']
        items = body['items']

        if not (tenant_id and customer_name and items):
            return {
                'statusCode': 400,
                'body': 'Los campos tenant_id, customer_name y items son obligatorios.'
            }

        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('tabla_pedidos')

        order_id = str(uuid.uuid4())
        created_at = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

        table.put_item(
            Item={
                'tenant_id': tenant_id,
                'order_id': order_id,
                'customer_name': customer_name,
                'items': items,
                'created_at': created_at,
                'status': 'CREATED'
            }
        )

        return {
            'statusCode': 201,
            'body': {'message': 'Pedido creado exitosamente.', 'order_id': order_id}
        }

    except ValueError as e:
        return {
            'statusCode': 403,
            'body': f'{str(e)}'
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': 'El cuerpo de la solicitud debe ser JSON válido.'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error interno: {str(e)}'
        }

        
