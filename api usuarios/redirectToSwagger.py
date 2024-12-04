import boto3
import os
import json

def lambda_handler(event, context):
    swagger_url = "https://multitenancyswaggerproject.s3.us-east-1.amazonaws.com/ApiUsuariosSwagger/index.html"
    
    return {
        'statusCode': 302,  # Código HTTP 302 indica redirección
        'headers': {
            'Location': swagger_url  # Dirección de redirección
        },
        'body': json.dumps({'message': 'Redirecting to Swagger UI'})
    }
    