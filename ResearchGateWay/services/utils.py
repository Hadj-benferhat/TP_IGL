import jwt
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status


def createToken(user):
    payload = {
        'userId': user.id,
        'username': user.userName,
        'role': user.role
    }
    secret_key = "jwtSecret"  
    expiration_time = 30 * 24 * 60 * 60  

    token = jwt.encode(payload, secret_key, algorithm = "HS256")

    return token 


def decodeJwtAndCheckRole(token):

    decoded_token = jwt.decode(token, "jwtSecret", algorithms = "HS256")
    try:
            
        # Check the role in the payload
        role = decoded_token.get("role")

        return role
    except:
        return Response({'error': 'invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
