API_KEY = "supersecretapikey"

def validar_api_key(headers):
    api_key = headers.get('Authorization')

    if api_key != f"Bearer {API_KEY}":
        raise ValueError("Clave de API inválida")

    return "API Key válida" 