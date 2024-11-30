import boto3
import uuid
from datetime import datetime
import json
import os

def lambda_handler(event, context):
    try:
        headers = event['headers']
        
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
        table_name = os.getenv("TABLE_NAME")
        if not table_name:
            raise Exception("El nombre de la tabla no esta configurado en las variables de entorno.")
        table = dynamodb.Table(table_name)

        print("Nombre de la tabla DynamoDB", table_name)
        order_id = str(uuid.uuid4())
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        item={
                'tenant_id': tenant_id,
                'order_id': order_id,
                'customer_name': customer_name,
                'items': items,
                'created_at': created_at,
                'status': 'CREATED'
        }
        print("Item a insertar:", item)
        table.put_item(Item=item)

        return {
            'statusCode': 200,  # Código HTTP esperado
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Pedido creado exitosamente.'})
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

        
