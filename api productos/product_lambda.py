import boto3
import uuid
import json

# Conexión a DynamoDB
dynamodb = boto3.resource('dynamodb')
product_table = dynamodb.Table('Productos')

# Función para listar productos
def list_products():
    response = product_table.scan()
    return response['Items']

# Función para recuperar un producto por ID
def retrieve_product(product_id):
    response = product_table.get_item(Key={'product_id': product_id})
    return response.get('Item', None)

# Función para agregar un producto
def add_product(data):
    product_id = str(uuid.uuid4())
    data['product_id'] = product_id
    product_table.put_item(Item=data)
    return product_id

# Función para modificar un producto
def modify_product(product_id, data):
    product_table.update_item(
        Key={'product_id': product_id},
        UpdateExpression="SET #name = :name, #price = :price, #desc = :desc",
        ExpressionAttributeNames={
            "#name": "name",
            "#price": "price",
            "#desc": "description"
        },
        ExpressionAttributeValues={
            ':name': data['name'],
            ':price': data['price'],
            ':desc': data['description']
        }
    )

# Función para eliminar un producto
def remove_product(product_id):
    product_table.delete_item(Key={'product_id': product_id})

# Funciones Lambda

# Obtener productos
def get_products(event, context):
    products = list_products()
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(products)
    }

# Crear producto
def create_product(event, context):
    try:
        data = json.loads(event['body'])
        product_id = add_product(data)
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Product created', 'product_id': product_id})
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }

# Manejar productos (consultar, actualizar, eliminar)
def manage_product(event, context):
    product_id = event['pathParameters']['product_id']
    
    if event['httpMethod'] == 'GET':
        product = retrieve_product(product_id)
        if product:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(product)
            }
        else:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Product not found'})
            }
    
    elif event['httpMethod'] == 'PUT':
        try:
            data = json.loads(event['body'])
            modify_product(product_id, data)
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Product updated'})
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': str(e)})
            }
    
    elif event['httpMethod'] == 'DELETE':
        try:
            remove_product(product_id)
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Product deleted'})
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': str(e)})
            }
