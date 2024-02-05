import datetime
import jwt
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from .models import Article
import gdown
import os
import pickle
from google_auth_oauthlib.flow import Flow, InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from google.auth.transport.requests import Request
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import requests
from pydrive.auth import GoogleAuth
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import fitz  # PyMuPDF
import nltk
import re



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
    


def authenticate_gdrive():
    # Try loading saved credentials
    gauth = GoogleAuth()
    gauth.LoadCredentialsFile("/home/hadj/backend/ResearchGateWay/services/client_secret_147560282956-9h68i9kf4l0goiulbpf13cknqvp34feg.apps.googleusercontent.com.json")  # Provide the path to your existing credentials file

    if gauth.credentials is None:
        # Authenticate using local webserver (interactive)
        gauth.LocalWebserverAuth()
        gauth.SaveCredentialsFile("/home/hadj/backend/ResearchGateWay/services/client_secret_147560282956-9h68i9kf4l0goiulbpf13cknqvp34feg.apps.googleusercontent.com.json")  # Save credentials for future use

    return GoogleDrive(gauth)




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



#----------------------------FUNCTION TO ANALYZE ARTICLES----------------------------#
    



def show_first_lines(text, num_lines=5):
    lines = text.split('\n')[:num_lines]
    result = '\n'.join(lines)
    print(result)

def replace_char(input_string, old_char, new_char):
    """
    Replace all instances of old_char with new_char in the input_string.

    Parameters:
    - input_string: The original string.
    - old_char: The character to be replaced.
    - new_char: The character to replace old_char with.

    Returns:
    - The modified string.
    """
    return input_string.replace(old_char, new_char)

def is_proper_noun(word):
    # Tokenize the word and get its part-of-speech tag
    pos_tags = nltk.pos_tag([word])
    
    # Check if the tag indicates a proper noun (NNP: singular proper noun, NNS: plural proper noun)
    return pos_tags[0][1] in ['NNP', 'NNPS']

def is_alpha_word(word):
    for char in word:
        if not char.isalpha():
            return False
    return True

def is_english_word(word):
    pos_tags = nltk.pos_tag([word])
    
    # Check if the word is tagged as a proper noun (NNP) or not
    return pos_tags[0][1] not in ['NNP', 'NNPS']


def clean_string(the_string, the_word):
    the_string = delete_word(the_word, the_string)
    while (len(the_string) > 0) and (not is_alpha_or_num(the_string[0])):
        the_string = the_string[1:]
    return the_string

def is_alpha_or_num(char):
    if char.isalpha() or char.isdigit():
        return True
    else:
        return False

def remove_newlines(input_string):
    return input_string.replace('\n', '')

def is_english(text):
    max_fault = len(text.split())
    clean_text = ''.join(text.split()).lower()
    for character in clean_text:
        if not character.isalpha():
            max_fault -= 1
    if max_fault > 0:
        return True
    else:
        return False

def extract_pdf_title(pdf_path):
    try:
        pdf_document = fitz.open(pdf_path)
        metadata = pdf_document.metadata
        title = metadata.get("title", "Title not found")
        pdf_document.close()
        if len(title) > 28:
            return title
        else:
            return -1
    except Exception as e:
        return f"Error: {str(e)}"
    
def extract_text_boxes_all_pages(pdf_path):
    text_boxes_all_pages = []

    pdf_document = fitz.open(pdf_path)

    for page_number in range(pdf_document.page_count):
        current_page = pdf_document[page_number]
        blocks = current_page.get_text("blocks")

        for block in blocks:
            bbox = block[:4]  # Bounding box (x0, y0, x1, y1)
            text_content = block[4]  # Text content

            text_boxes_all_pages.append({
                'page_number': page_number + 1,  # Adding 1 to convert 0-based index to 1-based page number
                'bbox': bbox,
                'text': text_content,
            })

    pdf_document.close()
    return text_boxes_all_pages

def extract_text_boxes(pdf_path):
    text_boxes = []

    pdf_document = fitz.open(pdf_path)
    first_page = pdf_document[0]
    blocks = first_page.get_text("blocks")

    for block in blocks:
        bbox = block[:4]  # Bounding box (x0, y0, x1, y1)
        text_content = block[4]  # Text content

        text_boxes.append({
            'bbox': bbox,
            'text': text_content,
        })

    pdf_document.close()
    return text_boxes

def extract_title(pdf_file_path): #returns the title in a string
    check_next_box = False
    text_boxes = extract_text_boxes(pdf_file_path)
    pdf_title = extract_pdf_title(pdf_file_path)
    if pdf_title != -1:
        return pdf_title
    else:
        for box in text_boxes:
            if check_next_box:
                if box['text'].find('\n') > 20:
                    pdf_title += box['text']
                    pdf_title = remove_newlines(pdf_title)
                return pdf_title
            else:
                if is_english(box['text']):
                    pdf_title = remove_newlines(box['text'])
                    check_next_box = True
    return "Error : Title not found"

def find_index_ignore_case_and_spaces(larger_string, search_string):
    # Remove white spaces and convert to lowercase
    cleaned_search = ''.join(search_string.split()).lower()
    cleaned_larger = ''.join(larger_string.split()).lower()

    # Using regular expression to find the search string with case-insensitivity
    match = re.search(re.escape(cleaned_search), cleaned_larger, re.IGNORECASE)

    if match:
        return match.start()
    else:
        return -1
    
def find_index_case_sensitive(larger_string, search_string):
    # Remove white spaces and convert to lowercase
    cleaned_search = search_string.lower()
    cleaned_larger = larger_string.lower()

    # Using regular expression to find the search string with case-insensitivity
    match = re.search(re.escape(cleaned_search), cleaned_larger, re.IGNORECASE)

    if match:
        if larger_string[match.start()].isupper():
            return match.start()
        else:
            return -1
    else:
        return -1
    
def delete_word(the_word, string_with_word):
    i = 0
    while (i < len(the_word)):
        if compare_words(the_word[i], string_with_word[0]):
            i += 1
        string_with_word = string_with_word[1:]
    return string_with_word

def compare_words(string1, string2):
    if (string1.lower() == string2.lower()):
        return True
    else:
        return False
    
def extract_abstract(pdf_file_path): #returns the summary as string
    text_boxes = extract_text_boxes(pdf_file_path)
    this_the_box = False
    for box in text_boxes:
        index_abstract = find_index_ignore_case_and_spaces(box['text'], "abstract")
        if (index_abstract != -1) and not this_the_box:
            abstract_string = box['text']
            if len(abstract_string) > 10:
                return remove_newlines(clean_string(box['text'], "abstract"))
            else:
                this_the_box = True
        else:
            if this_the_box:
                return remove_newlines(box['text'])
    return "Error : Abstract not found"

def extract_keywords(pdf_file_path): #returns the keywords as a string
    text_boxes = extract_text_boxes(pdf_file_path)
    this_the_box = False
    for box in text_boxes:
        index_keywords = find_index_ignore_case_and_spaces(box['text'], "keywords")
        index_terms = find_index_ignore_case_and_spaces(box['text'], "index terms")
        if ((index_terms != -1) or (index_keywords != -1) and not this_the_box):
            the_term = "keywords"
            the_index = index_keywords
            if index_terms > index_keywords:
                the_term = "index terms"
                the_index = index_terms
            keyword_string = box['text'][the_index:]
            if len(keyword_string) > 10:
                return clean_string(keyword_string, the_term)
            else:
                this_the_box = True
        else:
            if this_the_box:
                return box['text']
    return "Error : Keywords not found"

def extract_authors(pdf_file_path):
    words_list = ["keywords", "abstract", "article"]
    authors_string = ""
    text_boxes = extract_text_boxes(pdf_file_path)
    title_words = extract_title(pdf_file_path).split()
    last_title_word = title_words[-1]
    start_extracting = False
    the_end = False
    for box in text_boxes:
        text_box_string = box['text']
        if not start_extracting:
            if find_index_ignore_case_and_spaces(text_box_string, last_title_word) != -1:
                start_extracting = True
        else:
            for word in words_list:
                index = find_index_ignore_case_and_spaces(text_box_string, word)
                if index != -1:
                    the_end = True
                    break
            if not index != -1:
                authors_string += text_box_string
            if the_end:
                break
    if authors_string == "":
        return "Error : Authors not found"
    else:
        return authors_string


def extract_references(pdf_file_path):
    references_string = ""
    text_boxes = extract_text_boxes_all_pages(pdf_file_path)
    start_extracting = False
    for box in text_boxes:
        text_box_string = box['text']
        if not start_extracting:
            if find_index_case_sensitive(text_box_string, "References") != -1:
                start_extracting = True
                ref_page_num = box['page_number']
                if len(text_box_string) > 15:
                    text_box_string = delete_word("references", text_box_string)
                    references_string += text_box_string[1:]
        else:
            if box['page_number'] < ref_page_num + 3 :
                references_string += text_box_string
            else:
                break
    if references_string == "":
        return "Error : References not found"
    else:
        return references_string
    
def extract_integral_text(pdf_file_path):
    integral_text_string = ""
    text_boxes = extract_text_boxes_all_pages(pdf_file_path)
    start_extracting = False
    for box in text_boxes:
        page_courrante = box['page_number']
        text_box_string = box['text']
        if not start_extracting:
            if page_courrante == 1:
                if find_index_case_sensitive(text_box_string, "Introduction") != -1:
                    start_extracting = True
                    integral_text_string += text_box_string
            else:
                return extract_integral_text_second_try(pdf_file_path)
        else:
            index_ref = find_index_case_sensitive(text_box_string, "References")
            if index_ref != -1:
                break
            integral_text_string += text_box_string
    if integral_text_string == "":
        return "Error : Integral Text not found"
    else:
        return integral_text_string
    
def extract_integral_text_second_try(pdf_file_path):
    integral_text_string = ""
    text_boxes = extract_text_boxes_all_pages(pdf_file_path)
    start_extracting = False
    for box in text_boxes:
        text_box_string = box['text']
        if not start_extracting:
            if find_index_ignore_case_and_spaces(text_box_string, "1") == 0:
                start_extracting = True
                integral_text_string += text_box_string
        else:
            index_ref = find_index_case_sensitive(text_box_string, "References")
            if index_ref != -1:
                break
            integral_text_string += text_box_string
    if integral_text_string == "":
        return "Error : Integral Text not found"
    else:
        return integral_text_string
            

'''# Example usage
pdf_path = "Article_16.pdf"  # Replace with your actual PDF file path
big_string = extract_integral_text(pdf_path)                                                                                                                                                                                                                                                                                                                                                          
print(big_string)
show_first_lines(big_string)'''