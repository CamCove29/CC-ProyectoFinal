import jwt

SECRET_KEY = "supersecretkey"

def validar_token(headers):
    try:
        # Obtener el token del header Authorization
        token = headers.get('Authorization', '').replace('Bearer ', '')

        if not token:
            raise jwt.InvalidTokenError("Token no proporcionado")

        # Decodificar el token
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload  # Devuelve los datos del token

    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("El token ha expirado")
    except jwt.InvalidTokenError as e:
        raise jwt.InvalidTokenError(f"Token inválido: {str(e)}")
