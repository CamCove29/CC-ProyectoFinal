import json
import boto3
import uuid
import os
from datetime import datetime

# Configuración de DynamoDB
dynamodb = boto3.resource('dynamodb')
table_name = os.getenv("TABLE_NAME")
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Manejador principal de la función Lambda.
    Gestiona todas las operaciones relacionadas con los productos.
    """
    http_method = event['httpMethod']
    tenant_id = event['queryStringParameters'].get('tenant_id') if event.get('queryStringParameters') else None
    product_id = event['pathParameters'].get('product_id') if event.get('pathParameters') else None

    if http_method == 'GET' and product_id:
        return get_product(tenant_id, product_id)
    elif http_method == 'GET' and not product_id:
        return get_products(tenant_id)
    elif http_method == 'POST':
        return create_product(event)
    elif http_method == 'PUT':
        return update_product(tenant_id, product_id, event)
    elif http_method == 'DELETE':
        return delete_product(tenant_id, product_id)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Method Not Allowed'})
        }

def get_products(tenant_id):
    """Obtener todos los productos de un tenant."""
    if not tenant_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'El parámetro tenant_id es obligatorio.'})
        }

    try:
        response = table.query(
            KeyConditionExpression="tenant_id = :tenant_id",
            ExpressionAttributeValues={":tenant_id": tenant_id}
        )

        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

def get_product(tenant_id, product_id):
    """Obtener un producto específico de un tenant."""
    if not tenant_id or not product_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Los parámetros tenant_id y product_id son obligatorios.'})
        }

    try:
        response = table.get_item(
            Key={'tenant_id': tenant_id, 'product_id': product_id}
        )

        item = response.get('Item')

        if not item:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Product not found'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps(item)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

def create_product(event):
    """Crear un nuevo producto para un tenant."""
    body = json.loads(event['body'])
    tenant_id = body.get('tenant_id')
    product_name = body.get('name')
    price = body.get('price')
    description = body.get('description')

    if not tenant_id or not product_name or not price or not description:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Los campos tenant_id, name, price y description son obligatorios.'})
        }

    try:
        product_id = str(uuid.uuid4())
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        item = {
            'tenant_id': tenant_id,
            'product_id': product_id,
            'name': product_name,
            'price': price,
            'description': description,
            'created_at': created_at
        }

        table.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Product created', 'product_id': product_id})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

def update_product(tenant_id, product_id, event):
    """Actualizar un producto existente de un tenant."""
    if not tenant_id or not product_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Los parámetros tenant_id y product_id son obligatorios.'})
        }

    body = json.loads(event['body'])

    try:
        table.update_item(
            Key={'tenant_id': tenant_id, 'product_id': product_id},
            UpdateExpression="SET #name = :name, #price = :price, #desc = :desc",
            ExpressionAttributeNames={
                '#name': 'name',
                '#price': 'price',
                '#desc': 'description'
            },
            ExpressionAttributeValues={
                ':name': body.get('name'),
                ':price': body.get('price'),
                ':desc': body.get('description')
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Product updated'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

def delete_product(tenant_id, product_id):
    """Eliminar un producto de un tenant."""
    if not tenant_id or not product_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Los parámetros tenant_id y product_id son obligatorios.'})
        }

    try:
        table.delete_item(
            Key={'tenant_id': tenant_id, 'product_id': product_id}
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Product deleted'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
