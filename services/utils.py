import jwt
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from .models import Article

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive



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
    


#---------------------------------------------upload articles----------------------------------------------#
    
'''def authenticate_gdrive(application_password):
    gauth = GoogleAuth()
    # Use the application password for authentication
    gauth.credentials = application_password
    drive = GoogleDrive(gauth)
    return drive'''


def authenticate_gdrive(application_password):
    gauth = GoogleAuth()
    gauth.auth_method = 'oauth2'
    gauth.credentials = application_password
    return gauth


def get_folder_id(drive, folder_name):
    # Get the ID of the folder by name
    file_list = drive.ListFile({'q': "title = '{}' and mimeType = 'application/vnd.google-apps.folder' and trashed=false".format(folder_name)}).GetList()
    if file_list:
        return file_list[0]['id']
    else:
        raise Exception("Folder '{}' not found.".format(folder_name))


def list_files_in_folder(drive, folder_id):
    # List files in the specified folder
    file_list = drive.ListFile({'q': "'{}' in parents and trashed=false".format(folder_id)}).GetList()
    return file_list

#uehg zxqn plif gzpu






# Replace 'your_application_password' with the actual application-specific password


#----------------------------FUNCTIONS TO INTERACT WITH ELASTICSEARCH----------------------------#
    
#function to get indexxes from elasticsearch
#function to add indexxes in elasticsearch
'''def addDocumentToElasticsearch(reqTitle,reqSamary,reqAuthors,reqInstitutions,reqIntegralText,reqPdfUrl,reqReference):
    newDocument = Article(title = reqTitle,samary =reqSamary, authors = reqAuthors,institutions = reqInstitutions,integralText = reqIntegralText,pdfUrl = reqPdfUrl,reference = reqReference)
    newDocument.save()'''
#function to update indexxes in elasticsearch
    

def addDocumentToElasticsearch():
    newDocument = Article(title = "sofiane",samary ="request.samary", authors = "request.authors",institutions = "request.institutions",integralText = "request.integralText",pdfUrl = "request.pdfUrl",reference = "request.reference")
    newDocument.save()





