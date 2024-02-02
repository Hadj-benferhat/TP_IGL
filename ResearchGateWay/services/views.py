from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
from .utils import createToken, decodeJwtAndCheckRole,authenticate_gdrive
from .utils import extract_pdf_title,extract_keywords,extract_abstract,extract_authors,extract_integral_text,extract_references,ex
from rest_framework.parsers import JSONParser
from .models import Utilisateur,Article,Favoris
from .serializers import UtilisateurSerializer,ArticleSerializer,FavorisSerializer
from rest_framework import status
from datetime import datetime
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Q 
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from pydrive.drive import GoogleDrive

import json
from .documents import articleDocument 
import gdown

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
        return JsonResponse({'message': 'Login successful.', 'token': token}, status=status.HTTP_200_OK)
    else:
        # Incorrect credentials
        return JsonResponse({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(["POST"])
def register(request):

    data = JSONParser().parse(request)
    serializer = UtilisateurSerializer(data=data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        userName = serializer.validated_data['userName']
        

        if not email or not password or not userName:
           return JsonResponse({'error': 'all fieds are requiired.'}, status=status.HTTP_400_BAD_REQUEST) 
        # Check if the email already exists
        if Utilisateur.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password
        
        hashed_password = make_password(password)
        

        # Save the new user
        serializer.validated_data['password'] = hashed_password
        new_user = serializer.save()

        # Create a custom JWT token
        token = createToken(new_user)

        return JsonResponse({'message': 'User registered successfully.', 'token': token}, status=status.HTTP_201_CREATED)

    return JsonResponse({'error': 'Invalid data.'}, status=status.HTTP_400_BAD_REQUEST)



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



@api_view(["GET"])
def getArticles(request):

    
    authorization_header= request.headers.get('Authorization')
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "user":
            return Response({'error': 'you are not authorized.'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            #search in elasticsearch index by filters(req)
            #from utils function 

            #return json
            return Response({"msg":"articles","status":status.HTTP_200_OK})
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})
    

@api_view(["POST"])
def uploadArticle(request):


    #------------- hna ra7 n3aytou l les fonction ta3 analyze pdf li jayin f utils.py--------------

    authorization_header= request.headers.get('Authorization')
    
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
            
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "admin":
            return Response({'error': 'you are not authorized.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            
            print("ani dkhalt\n")

            # Replace 'your_folder_id' with the actual ID of your Google Drive folder
            folder_id = 'https://drive.google.com/drive/folders/1sovFcpNKdKLTWXEEbhgOCkLn5Au7Mok_'
            output_folder = '/home/hadj/backend/ResearchGateWay/Articles'

            drive = authenticate_gdrive()

            # List all files in the folder
            folder = drive.CreateFile({'id': folder_id})
            file_list = drive.ListFile({'q': f"'{folder_id}' in parents"}).GetList()

            # Download each file in the folder
            for file in file_list:
                file.GetContentFile(f"{output_folder}/{file['title']}")


            #AIzaSyBTCLRtXd1JBn0-w3rDGFHaGsqWwinCmoY     api key
            
            



            #we need a loop for every article
            #upload articles from an url 
            #so in here all articles should be added to a list and we loop for each article 
                
            


            #for article in articles:            
                #analyze article and define the fields of addDocumentToElasticsearch() function  
                #print('Title: %s, ID: %s' % (article['title'], article['id']))        

                #add an elasticsearch index
                #addDocumentToElasticsearch()



                #saving the article in the database also os that we can pick favorite
                #------------------------------------------

        '''
                    title = ArticleSerializer.validated_data['title']
                    samary = ArticleSerializer.validated_data['samary']
                    authors = ArticleSerializer.validated_data['authors']
                    institutions = ArticleSerializer.validated_data['institutions']
                    integralText = ArticleSerializer.validated_data['integralText']
                    pdfUrl = ArticleSerializer.validated_data['pdfUrl']
                    reference = ArticleSerializer.validated_data['reference']
                    keyWords = ArticleSerializer.validated_data['keyWords']
                
                    new_article = ArticleSerializer.save()
                '''

                #------------------------------------------


            #return json
            
        return Response({"msg":"articles added","status":status.HTTP_200_OK})
    except:
        return Response({"msg":"something went ","status":status.HTTP_400_BAD_REQUEST})
    


    


#moderator we should add the id of each document
@api_view(["GET"])
def getAllDocuments(request):
    try:
        # Connect to the Elasticsearch cluster
        connections.create_connection(hosts=['http://localhost:9200'])

        # Get all documents from the Elasticsearch index
        all_documents = articleDocument.search().query('match_all')
        #response_data = {"documents": [hit.to_dict() for hit in all_documents], "status": 200}

        documents_data = [{'id': hit.meta.id, 'source': hit.to_dict()} for hit in all_documents]

        # Create the response data
        response_data = {"documents": documents_data, "status": 200}

        return JsonResponse(response_data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e), "status": 500}, status=500)



api_view(["GET"])
def searchInElasticsearch(request):
    authorization_header= request.headers.get('Authorization')
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "user":
            return Response({'error': 'you are not authentica.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            connections.create_connection(hosts=['http://localhost:9200'])

            json_data = json.loads(request.body.decode('utf-8'))

            # Define the base query
            base_query = Q()

            for field_name, field_value in json_data.items():
                base_query &= Q('match', **{field_name: field_value})

            # Execute the search and retrieve the hits
            search_query = articleDocument.search().query(base_query)
            response = search_query.execute()
            hits = response.hits

            # Extract and prepare data for rendering
            documents_data = [{'id': hit.meta.id, 'source': hit.to_dict()} for hit in hits]

            # Return the search results in a JSON response
            return JsonResponse({'documents_data': documents_data})
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})


@api_view(["PUT"])
def updateArticles(request,reqId):

    
    authorization_header= request.headers.get('Authorization')
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "moderateur":
            return Response({'error': 'you are not authorized.'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            #update an elasticsearch index
            connections.create_connection(hosts=['http://localhost:9200'])
             # Get the JSON data from the request
            json_data = json.loads(request.body.decode('utf-8'))

            # Get the existing document from the Elasticsearch index
            document = get_object_or_404(articleDocument, id = reqId)

            # Update the fields dynamically based on JSON data
            for field_name, field_value in json_data.items():
                setattr(document, field_name, field_value)

            # Save the updated document back to the index
            document.save()

            return JsonResponse({'status':status.HTTP_200_OK})

    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})
    

@api_view(["DELETE"])
def deleteArticle(request,reqId):

    authorization_header= request.headers.get('Authorization')
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
        else:
            return Response({'error': 'unauthorized.'}, status=status.HTTP_400_BAD_REQUEST)

        role = decodeJwtAndCheckRole(token)
        if role != "moderateur":
            return Response({'error': 'you are not authorized.'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            connections.create_connection(hosts=['http://localhost:9200'])

            # Get the existing document from the Elasticsearch index
            document = get_object_or_404(articleDocument, id = reqId)

            # Save the updated document back to the index
            document.delete()

            return JsonResponse({'status':status.HTTP_200_OK})


            #from utils function 


            #return json
            #return Response({"msg":"articles updated","status":status.HTTP_200_OK})
    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})
    

@api_view(["DELETE"])
def deleteFavoris(request,id):
    try:
        query = Favoris.objects.get(id=id)
        query.delete()
        return Response({"msg":"deleted successfully","status":status.HTTP_200_OK})

    except:
        return Response({"msg":"something went wrong","status":status.HTTP_400_BAD_REQUEST})
    

@api_view(["POST"])
def addFavoris(request):
    
    idUtilisateur=request.data["idUtilisateur"]
    idArticle=request.data["idArticle"]
    Utilisateurquery=Utilisateur.objects.get(id=idUtilisateur)
    Articleerquery=Article.objects.get(id=idArticle)
    if Articleerquery and Utilisateurquery:
        fav=Favoris.objects.create(idUtilisateur=Utilisateurquery,idArticle=Articleerquery)
        if fav:
            return Response({"msg":"added to Favoriss","status":status.HTTP_201_CREATED})
        else: return Response({"msg":"something went wrong try again","status":status.HTTP_400_BAD_REQUEST})
    else: return Response({"msg":"wrong operation","status":status.HTTP_401_UNAUTHORIZED})




@api_view(["GET"])
def getFavoris(request,id):
    Articlelist=[]
    query=Favoris.objects.filter(idUtilisateur=id)
    Favorisserilizer=FavorisSerializer(query, many=True)
    idArticle=Favorisserilizer.data[1]["idArticle"]
    i=0
    for element in query:
        idArticle=Favorisserilizer.data[i]["idArticle"]
        Articlelist.extend(list(Article.objects.filter(id=idArticle)))
        i=i+1
    print(Articlelist)
    serializer=ArticleSerializer(Articlelist,many=True)
    return Response({"data":serializer.data})



'''@api_view(["GET"])
def getfavorite(request,id):
    placelist=[]
    query=Favorite.objects.filter(idUtilizer=id)
    favoriteserilizer=FavoriteSerializer(query, many=True)
    idplace=favoriteserilizer.data[1]["idPlace"]
    i=0
    for element in query:
        idplace=favoriteserilizer.data[i]["idPlace"]
        placelist.extend(list(Place.objects.filter(id=idplace)))
        i=i+1
    print(placelist)
    serializer=PlaceSerializer(placelist,many=True)
    return Response({"data":serializer.data})    
'''
