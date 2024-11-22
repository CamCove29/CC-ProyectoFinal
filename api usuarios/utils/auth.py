import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'supersecretkey'

def generate_token(email):
    expiration = datetime.utcnow() + timedelta(hours=1)
    token = jwt.encode({'email': email, 'exp': expiration}, SECRET_KEY, algorithm='HS256')
    return token

def validate_token(token):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return data['email']
    except jwt.ExpiredSignatureError:
        return None