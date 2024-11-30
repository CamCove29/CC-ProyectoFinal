import boto3

def lambda_handler(event, context):
    try:
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

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error interno: {str(e)}'
        }
