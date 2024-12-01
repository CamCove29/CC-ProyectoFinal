import boto3
import json
import os
from uuid import uuid4
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table(os.getenv('USERS_TABLE'))

# Función para validar el token (suponiendo que lo validamos manualmente por el header Authorization)
def validate_token(token):
    # Este ejemplo solo valida si el token tiene un formato específico.
    if not token:
        return None
    try:
        # Aquí podrías usar Cognito o un JWT manual.
        # Por ejemplo, decodificar un JWT y verificar la firma
        decoded_token = token.split(' ')[1]  # Suponiendo formato "Bearer <token>"
        # A continuación, puedes agregar validación del token usando AWS Cognito o alguna lógica personalizada.
        return decoded_token  # Retorna el 'email' o 'user_id' extraído del token.
    except Exception as e:
        print(f"Error de validación de token: {str(e)}")
        return None

# Función para obtener todos los usuarios
def get_all_users():
    response = user_table.scan()
    return response['Items']

# Función para obtener un usuario por su ID
def get_user_by_id(user_id):
    response = user_table.get_item(Key={'user_id': user_id})
    return response.get('Item')

# Función para crear un usuario
def create_user(data):
    user_id = str(uuid4())  # Generamos un ID único para el usuario
    data['user_id'] = user_id
    user_table.put_item(Item=data)
    return user_id

# Función para actualizar un usuario
def update_user(user_id, data):
    user_table.update_item(
        Key={'user_id': user_id},
        UpdateExpression="SET #name = :name, #email = :email, #role = :role",
        ExpressionAttributeNames={
            "#name": "name",
            "#email": "email",
            "#role": "role"
        },
        ExpressionAttributeValues={
            ':name': data['name'],
            ':email': data['email'],
            ':role': data['role']
        }
    )

# Función para eliminar un usuario
def delete_user(user_id):
    user_table.delete_item(Key={'user_id': user_id})

def lambda_handler(event, context):
    token = event['headers'].get('Authorization')
    user_info = validate_token(token)

    if not user_info:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Unauthorized'})
        }

    path = event.get('resource')
    method = event.get('httpMethod')

    # Manejo de solicitudes GET
    if method == 'GET':
        if path == '/users':  # Obtener todos los usuarios
            users = get_all_users()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(users)
            }
        else:  # Obtener usuario por ID
            user_id = event['pathParameters']['user_id']
            user = get_user_by_id(user_id)
            if user:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps(user)
                }
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'User not found'})
            }

    # Manejo de solicitudes POST (crear usuario)
    elif method == 'POST' and path == '/users':
        try:
            body = json.loads(event['body'])
            user_id = create_user(body)
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'User created', 'user_id': user_id})
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': f'Error creating user: {str(e)}'})
            }

    # Manejo de solicitudes PUT (actualizar usuario)
    elif method == 'PUT':
        user_id = event['pathParameters']['user_id']
        try:
            body = json.loads(event['body'])
            update_user(user_id, body)
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'User updated'})
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': f'Error updating user: {str(e)}'})
            }

    # Manejo de solicitudes DELETE (eliminar usuario)
    elif method == 'DELETE':
        user_id = event['pathParameters']['user_id']
        try:
            delete_user(user_id)
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'User deleted'})
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': f'Error deleting user: {str(e)}'})
            }

    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'Method Not Allowed'})
    }
