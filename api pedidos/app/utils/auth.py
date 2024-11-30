import jwt
from datetime import datetime, timedelta

SECRET_KEY = "supersecretkey"

def generate_token(email):
    expiration = datetime.utcnow() + timedelta(hours=1)
    return jwt.encode({"email": email, "exp": expiration}, SECRET_KEY, algorithm="HS256")

def validate_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])["email"]
    except jwt.ExpiredSignatureError:
        return None
