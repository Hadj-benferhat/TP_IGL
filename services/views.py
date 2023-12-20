from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
from .utils import createToken,decodeJwtAndCheckRole
from rest_framework.parsers import JSONParser
from .models import Utilisateur,Article,Favoris
from .serializers import UtilisateurSerializer,ArticleSerializer,FavorisSerializer
from rest_framework import status
from datetime import datetime


@api_view(["POST"])
def login(request):
    data = JSONParser().parse(request)
    email = data.get('email')
    password = data.get('password')

    # Find the user by username
    user = Utilisateur.objects.filter(email=email).first()

    if user is not None and check_password(password, user.password):
        # User is authenticated, create and send a JWT token
        token = createToken(user)
        return Response({'message': 'Login successful.', 'token': token}, status=status.HTTP_200_OK)
    else:
        # Incorrect credentials
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(["POST"])
def register(request):

    data = JSONParser().parse(request)
    serializer = UtilisateurSerializer(data=data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        userName = serializer.validated_data['userName']
        

        if not email or not password or not userName:
           return Response({'error': 'all fieds are requiired.'}, status=status.HTTP_400_BAD_REQUEST) 
        # Check if the email already exists
        if Utilisateur.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password
        
        hashed_password = make_password(password)
        

        # Save the new user
        serializer.validated_data['password'] = hashed_password
        new_user = serializer.save()

        # Create a custom JWT token
        token = createToken(new_user)

        return Response({'message': 'User registered successfully.', 'token': token}, status=status.HTTP_201_CREATED)

    return Response({'error': 'Invalid data.'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
def createModerator(request):
    data = JSONParser().parse(request)
    serializer = UtilisateurSerializer(data=data)
    authorization_header= request.headers.get('Authorization')

    try:

        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "admin":
            return Response({'error': 'you are not an admin.'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            if serializer.is_valid():
                email = serializer.validated_data['email']
                password = serializer.validated_data['password']
                userName = serializer.validated_data['userName']
                role = serializer.validated_data['role']

                if not email or not password or not userName or not role:
                    return Response({'error': 'all fieds are requiired.'}, status=status.HTTP_400_BAD_REQUEST) 
                # Check if the email already exists
                if Utilisateur.objects.filter(email=email).exists() or Utilisateur.objects.filter(userName=userName).exists():
                    return Response({'error': 'Email or userName already exists.'}, status=status.HTTP_400_BAD_REQUEST)

                # Hash the password
                
                hashed_password = make_password(password)

                # Save the new user
                serializer.validated_data['password'] = hashed_password
                new_moderator = serializer.save()

                return Response({'message': 'moderator created successfully.'}, status=status.HTTP_201_CREATED)

            return Response({'error': 'Invalid data.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})



@api_view(["GET"])
def getAllModerators(request):

    authorization_header= request.headers.get('Authorization')
    try:

        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)

        if role != "admin":
            return Response({'error': 'you are not an admin.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            query=Utilisateur.objects.filter(role = "moderateur")

            serializer=UtilisateurSerializer(query,many = True)
            return Response({"data":serializer.data,"status":status.HTTP_200_OK})
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})


@api_view(["DELETE"])
def deleteModerator(request,id):

    authorization_header= request.headers.get('Authorization')
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "admin":
            return Response({'error': 'you are not an admin.'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            query=Utilisateur.objects.filter(id = id)
            query.delete()
            return Response({"msg":"moderator deleted successfuly","status":status.HTTP_200_OK})
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})

