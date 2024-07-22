from datetime import datetime
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
import logging
from django.contrib import messages

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from dotenv import load_dotenv
from django.middleware.csrf import get_token
import json
from django.utils import timezone
from app.models import UserDetails, FileDetails
from django.conf import settings

#utility functions
from .utils.file_processing import processFile

from app.utils.text_processing import processJson

#get csrf token
def get_csrf_token(request):
    logging.info("get_csrf_token____")
    username = request.GET.get('username')
    logging.info('user [%s]',username)
    return JsonResponse({'csrfToken': get_token(request)})


#upload image and get data 
@csrf_exempt
def upload_image(request):
    logging.info("upload_image____")
    if request.method == 'POST' and request.FILES.get('file'):
        api_key = request.headers.get('X-APIKEY')
        load_dotenv()
        SECRET_KEY = os.getenv('SECRET_KEY')

        if SECRET_KEY is None:
          return JsonResponse({'error': 'Cannot load API Key'}, status=401)

        if api_key != SECRET_KEY:
            return JsonResponse({'error': 'Invalid API Key'}, status=401)

        username = request.headers.get('X-USERNAME')
        if not username:
            return JsonResponse({'error': 'Username not found'}, status=401)

        print("request from :"+username)
        
        uploaded_image_file = request.FILES['file']
        ret = {
            "status": 200,
            "mssg": "success",
            "data": {},
            "file_url": "",
            "upload_date": "",
            "verification": 0,
            "verification_doc_name": "",
            "verification_date": "",
            "verification_comment": "",
        }
        processFile(uploaded_image_file, username, ret)
        print("processing done")

        if(ret["status"]!=200):
            return JsonResponse({'error': ret["mssg"]}, status=ret["status"])

        print("done")
        print(type(ret['data']))
        base_url = settings.BASE_URL
        ret['file_url'] = base_url+ret['file_url']

        return JsonResponse({'message': 'File uploaded successfully', 'ret': ret})
    return JsonResponse({'message': 'No file found'}, status=400)


#index view
def index(request):
    logging.info("index____")
    return render(request, "app/index.html")


def sampleData(request):
    logging.info("sample_____")
    data = ''
    current_directory = os.getcwd()
    new_path = os.path.join(current_directory,'app/utils/sampleData.txt')
    with open(new_path, 'r') as file:
      data = file.read()
    result, ext = processJson(data)
    print(ext)
    ret = {
            "status": 200,
            "mssg": "success",
            "data": ext,
            "file_url": settings.BASE_URL+"/media/user1_max.j_18_07_2024_16_27_18.jpg",
            "upload_date": "21/04/2001(21:21)",
            "verification": 0,
            "verification_doc_name": "abhishek kumar",
            "verification_date": "22/01/2023",
            "verification_comment": "lololol",
        }
    return JsonResponse({'message': 'File uploaded successfully', 'ret': ret})


def get_history(request):
  print("get History...")
  api_key = request.headers.get('X-APIKEY')
  load_dotenv()
  SECRET_KEY = os.getenv('SECRET_KEY')

  if SECRET_KEY is None:
    return JsonResponse({'error': 'Cannot load API Key'}, status=401)

  if api_key != SECRET_KEY:
    return JsonResponse({'error': 'Invalid API Key'}, status=401)

  username = request.headers.get('X-USERNAME')
  if not username:
    return JsonResponse({'error': 'Username not found'}, status=401)

  print("request from :"+username)
  
  try:
    user = UserDetails.objects.get(username=username)

    data = []

    for file_entry in user.files_list:
      print(file_entry)
      file_info = {}
      try:
        file = FileDetails.objects.get(file_name=file_entry)
        
        file_info["data_from_llm"] = file.data_from_llm
        file_info["img_url"] = settings.BASE_URL+file.file_url
        file_info['upload_date'] = file.upload_date.strftime('%d/%m/%Y (%H:%M)')
        

        file_info['verification'] = file.isVerified
        if file.verification_doc:
          file_info['verification_doc_name'] = file.verification_doc.doc_name
        else:
          file_info['verification_doc_name'] = "unverified"

        file_info['verification_date'] = file.verification_date.strftime('%d/%m/%Y (%H:%M)')
        file_info['verification_comment'] = file.verification_comment

        data.append(file_info)

      except Exception as e:
        print(f"file for {file_entry} not found!\n[[{e}]")
  except Exception as e:
    print(f"user not found [{e}]")
    return JsonResponse({'message': 'User not found'}, status=404)

  print(data)
  try:
    data = json.dumps(data)
  except (TypeError, ValueError, json.JSONDecodeError) as e:
    print(f"######\nJSON conversion failed\n{e}\n######### ")
    return JsonResponse({'message': 'JSON conversion failed'}, status=401)
  except Exception as e:
    print(f"######\nAn unexpected error occurred\n{e}\n######### ")
    return JsonResponse({'message': 'JSON conversion failed'}, status=401)

  return JsonResponse({'message': 'History get success', 'ret': data}, status=200)

# logging.debug("This is a debug message")
# logging.info("This is an info message")
# logging.warning("This is a warning message")
# logging.error("This is an error message")
# logging.critical("This is a critical message")

#custom error handling [TODO: is there better approach?]
# ret = {
#     "status": 200,
#     "mssg": "success",
#     "data": {}
# }